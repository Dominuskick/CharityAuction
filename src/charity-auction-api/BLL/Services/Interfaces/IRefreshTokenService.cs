using BLL.Models.Responses;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IRefreshTokenService
    {
        public Task<Result<AuthSuccessResponse>> RevokeRefreshToken(AuthSuccessResponse refreshToken);
        public RefreshToken CreateRefreshToken(SecurityToken token, User user);
        Task<Result<IEnumerable<RefreshToken>>> FindRefreshToken(Guid token);
        Task<Result> UpdateRefreshToken(RefreshToken refreshToken);
    }
}
