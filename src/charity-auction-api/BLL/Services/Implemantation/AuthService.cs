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

namespace BLL.Services.Implemantation
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService tokenService;
        private readonly IMapper _mapper;

        public AuthService(UserManager<User> userManager, 
            ITokenService tokenService,
            IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
            this.tokenService = tokenService;
        }

        public async Task<Result<UserDetailsDto>> Register(RegisterDto userDto)
        {
            var user = new User
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                FullName = userDto.FullName
            };


            var result = await _userManager.CreateAsync(user, userDto.Password);
            if (result.Succeeded)
            {
                var map = _mapper.Map<UserDetailsDto>(user);
                return Result<UserDetailsDto>.Success(map);
            }
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result<UserDetailsDto>.Failure(errors);
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
                return Result<AuthSuccessResponse>.Failure(Messages.Auth.PasswordError);
            }
            var map = _mapper.Map<UserDetailsDto>(user);
            return Result<AuthSuccessResponse>.Success(await tokenService.GenerateToken(map));
        }

        public async Task<Result> Logout(string refreshToken)
        {
            // If we don't have refresh token it means that user is already logged out
            if(refreshToken is null)
            {
                return Result.Success();
            }

            var response = (await tokenService.FindRefreshToken(refreshToken));
            var refToken = response.Data.SingleOrDefault();

            if(refToken is null)
            {
                return Result.Failure(Messages.Auth.RefreshTokenNotFound);
            }
            refToken.Invalidated = true;

            await tokenService.UpdateRefreshToken(refToken);

            return Result.Success();
        }
      
    }
}
