using AutoMapper;
using Azure.Core;
using BLL.Constants;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BLL.Services.Implemantation
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository refreshTokenRepository;
        private readonly IAuthService authService;
        private readonly IUserService userService;
        private readonly TokenValidationParameters tokenValidationParameters;
        private readonly IMapper _mapper;

        public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository, 
            IUserService userService,
            IAuthService authService, 
            TokenValidationParameters tokenValidationParameters,
            IMapper mapper)
        {
            this.refreshTokenRepository = refreshTokenRepository;
            this.userService = userService;
            this.tokenValidationParameters = tokenValidationParameters;
            this.authService = authService;
            _mapper = mapper;
        }

        public Task<Result<IEnumerable<RefreshToken>>> FindRefreshToken(Guid token)
        {
            var refreshToken = refreshTokenRepository.FindAsync(t => t.Token == token);
            if (refreshToken == null) return Task.FromResult(Result <IEnumerable<RefreshToken >>.Failure(Messages.RefreshTokenNotFound));
            return Task.FromResult(Result<IEnumerable<RefreshToken>>.Success(refreshToken.Result));
        }

        public Task<Result> UpdateRefreshToken(RefreshToken refreshToken)
        {
            var result = refreshTokenRepository.UpdateAsync(refreshToken);
            if (result == null) return Task.FromResult(Result.Failure(Messages.RefreshTokenNotFound));
            return Task.FromResult(Result.Success());
        }

        public RefreshToken CreateRefreshToken(SecurityToken token, User user)
        {
            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(ApplicationConstants.RefreshTokenExpirationTimeInMonths),
            };
            return refreshToken;
        }

        public async Task<Result<AuthSuccessResponse>> RevokeRefreshToken(AuthSuccessResponse refreshToken)
        {
            var validatedToken = this.GetPrincipalFromToken(refreshToken.Token);

            var expiryDateUnix =
                long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expiryDateUnix);

            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
            var storedRefreshToken = (await refreshTokenRepository.FindAsync(t => t.Token.ToString() == refreshToken.Token)).First();
            if(storedRefreshToken == null) return Result<AuthSuccessResponse>.Failure(Messages.RefreshTokenNotFound);
            if (validatedToken == null
                || expiryDateTimeUtc > DateTime.UtcNow
                || storedRefreshToken == null
                || DateTime.UtcNow > storedRefreshToken.ExpiryDate
                || storedRefreshToken.Invalidated
                || storedRefreshToken.Used
                || storedRefreshToken.JwtId != jti)
            {
                return Result<AuthSuccessResponse>.Failure(Messages.RefreshTokenInvalid);
            }

            await refreshTokenRepository.DeleteAsync(storedRefreshToken.Token);

            var userId = validatedToken.Claims.Single(x => x.Type == "id").Value;
            var userDto = await userService.GetUser(Guid.Parse(storedRefreshToken.UserId));
            if (userDto == null) return Result<AuthSuccessResponse>.Failure(Messages.UserNotFound);
            var user = _mapper.Map<User>(userDto);
            var authResponse = await authService.GenerateAuthResponse(user);

            return Result<AuthSuccessResponse>.Success(authResponse);
        }

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var clonedTokenValidationParameters = this.tokenValidationParameters.Clone();
                clonedTokenValidationParameters.ValidateLifetime = false;
                var principal =
                    tokenHandler.ValidateToken(token, clonedTokenValidationParameters, out var validatedToken);
                return !IsJwtWithValidSecurityAlgorithm(validatedToken) ? null : principal;
            }
            catch
            {
                return null;
            }
        }

        private static bool IsJwtWithValidSecurityAlgorithm(SecurityToken token)
           => (token is JwtSecurityToken jwtSecurityToken)
              && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                  StringComparison.InvariantCultureIgnoreCase);

    }
}
