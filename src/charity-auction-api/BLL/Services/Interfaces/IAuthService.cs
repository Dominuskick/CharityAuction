using BLL.Models.Responses;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Result<AuthSuccessResponse>> Login(LoginDto loginDto);
        Task<Result<UserDetailsDto>> Register(RegisterDto registerDto);
        Task<AuthSuccessResponse> GenerateAuthResponse(User user);
        Task<Result> Logout(string refreshToken);
    }
}
