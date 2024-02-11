using BLL.Models.Responses;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using BLL.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using BLL.Constants;
using DAL.Repositories.Implementation;
using System.Security.Claims;
using AutoMapper;
using DAL.Repositories.Interfaces;
using System.Security.Cryptography;
using BLL.Models.AppSettings;

namespace BLL.Services.Implemantation
{
    public class TokenService : ITokenService
    {
        private readonly JwtSettings jwtSettings;
        private readonly IRefreshTokenRepository refreshTokenRepository;
        private readonly IUserService userService;
        private readonly TokenValidationParameters tokenValidationParameters;

        public TokenService(IOptions<JwtSettings> jwtSettings, 
            IRefreshTokenRepository refreshTokenRepository, 
            IUserService userService, 
            TokenValidationParameters tokenValidationParameters, 
            IMapper mapper)
        {
            this.jwtSettings = jwtSettings.Value;
            this.refreshTokenRepository = refreshTokenRepository;
            this.userService = userService;
            this.tokenValidationParameters = tokenValidationParameters;
        }

        public async Task<AuthSuccessResponse> GenerateToken(UserDetailsDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim("Id", user.Id),
                    new System.Security.Claims.Claim("NameIdentifier", user.Id),
                    new System.Security.Claims.Claim("Email", user.Email),
                    new System.Security.Claims.Claim("UserName", user.UserName),
                }),
                Expires = DateTime.UtcNow.Add(this.jwtSettings.TokenLifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            var refreshToken = CreateRefreshToken(token, user);
            await refreshTokenRepository.CreateAsync(refreshToken);

            var result = new AuthSuccessResponse
            {
                UserName = user.UserName,
                Token = encryptedToken,
                RefreshToken = refreshToken.Token,
            };
            return result;
        }

        public Task<Result<IEnumerable<RefreshToken>>> FindRefreshToken(string token)
        {
            var refreshToken = refreshTokenRepository.FindAsync(t => t.Token == token);
            if (refreshToken == null) return Task.FromResult(Result<IEnumerable<RefreshToken>>.Failure(Messages.RefreshTokenNotFound));
            return Task.FromResult(Result<IEnumerable<RefreshToken>>.Success(refreshToken.Result));
        }

        public Task<Result> UpdateRefreshToken(RefreshToken refreshToken)
        {
            var result = refreshTokenRepository.UpdateAsync(refreshToken);
            if (result == null) return Task.FromResult(Result.Failure(Messages.RefreshTokenNotFound));
            return Task.FromResult(Result.Success());
        }

        public RefreshToken CreateRefreshToken(SecurityToken token, UserDetailsDto user)
        {
            var refreshToken = new RefreshToken
            {
                Token = GenerateRefreshToken(),
                UserId = user.Id,
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(ApplicationConstants.RefreshTokenExpirationTimeInMonths),
            };
            return refreshToken;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<Result<AuthSuccessResponse>> RevokeRefreshToken(AuthSuccessResponse token)
        {
            var validatedToken = this.GetPrincipalFromToken(token.Token);

            /*var expiryDateUnix =
                long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expiryDateUnix);*/

            var storedRefreshToken = await refreshTokenRepository.GetAsync(token.RefreshToken);
            if (storedRefreshToken == null) return Result<AuthSuccessResponse>.Failure(Messages.RefreshTokenNotFound);
            if (validatedToken == null
                //|| expiryDateTimeUtc > DateTime.UtcNow
                || storedRefreshToken == null
                || DateTime.UtcNow > storedRefreshToken.ExpiryDate
                || storedRefreshToken.Invalidated
                || storedRefreshToken.Used)
            {
                return Result<AuthSuccessResponse>.Failure("Access token still can be used or refresh token is expired");
            }

            await refreshTokenRepository.DeleteAsync(storedRefreshToken.Token);

            var userDto = await userService.GetUser(Guid.Parse(storedRefreshToken.UserId));
            if (userDto == null) return Result<AuthSuccessResponse>.Failure(Messages.UserNotFound);
            var authResponse = await GenerateToken(userDto.Data);

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
