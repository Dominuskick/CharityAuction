using BLL.Models.Responses;
using BLL.Models;
using BLL.Services.Implemantation;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace BLL.Helpers
{
    public class TokenGenerator
    {
        public async Task<AuthSuccessResponse> GenerateAuthResponse(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim("Id", user.Id.ToString()),
                    new System.Security.Claims.Claim("Email", user.Email),
                    new System.Security.Claims.Claim("UserName", user.UserName),
                }),
                Expires = DateTime.UtcNow.Add(this.jwtSettings.TokenLifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            var refreshToken = refreshTokenService.CreateRefreshToken(token, user);

            var result = new AuthSuccessResponse
            {
                Token = encryptedToken,
                RefreshToken = refreshToken.Token,
            };
            return result;
        }
    }
}
