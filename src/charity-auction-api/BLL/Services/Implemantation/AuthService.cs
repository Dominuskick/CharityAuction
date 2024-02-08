using AutoMapper;
using Azure.Core;
using BLL.Constants;
using BLL.Models;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static BLL.Configurations.ModelConstants;
using User = Domain.Entities.User;

namespace BLL.Services.Implemantation
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService userService;
        private readonly IRefreshTokenService refreshTokenService;
        private readonly JwtSettings jwtSettings;
        private readonly IMapper _mapper;

        public AuthService(UserManager<User> userManager, IUserService userService, IRefreshTokenService refreshTokenService, IMapper mapper, IOptions<JwtSettings> jwtSettings)
        {
            _userManager = userManager;
            _mapper = mapper;
            this.jwtSettings = jwtSettings.Value;
            this.refreshTokenService = refreshTokenService;
            this.userService = userService;
        }

        public async Task<Result<UserDetailsDto>> Register(RegisterDto registerDto)
        {
            return await userService.CreateUser(registerDto);
        }

        public async Task<Result<AuthSuccessResponse>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user is null)
            {
                return Result<AuthSuccessResponse>.Failure("User not found");
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if(!result)
            {
                return Result<AuthSuccessResponse>.Failure(Messages.PasswordError);
            }
            return Result<AuthSuccessResponse>.Success(await GenerateAuthResponse(user));
        }

        public async Task<Result> Logout(string refreshToken)
        {
            // If we don't have refresh token it means that user is already logged out
            if(refreshToken is null)
            {
                return Result.Success();
            }

            var refToken = (await refreshTokenService.FindRefreshToken(Guid.Parse(refreshToken))).Data.SingleOrDefault();

            if(refToken is null)
            {
                return Result.Failure(Messages.RefreshTokenNotFound);
            }
            refToken.Invalidated = true;

            refreshTokenService.UpdateRefreshToken(refToken);

            return Result.Success();
        }

       
      
    }
}
