using AutoMapper;
using Azure;
using BLL.Constants;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implemantation
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<Result> DeleteUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);

                return Result.Success();
            }

            return Result.Failure(Messages.UserNotFound);
        }

        public async Task<Result<IEnumerable<UserDetailsDto>>> GetAllUsers()
        {
            var users = _userManager.Users;

            var result = _mapper.Map<IEnumerable<UserDetailsDto>>(users);
            return Result<IEnumerable<UserDetailsDto>>.Success(result);
        }

        public async Task<Result<UserDetailsDto>> GetUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user is null) return Result<UserDetailsDto>.Failure(Messages.UserNotFound);
            return Result<UserDetailsDto>.Success(_mapper.Map<UserDetailsDto>(user));
        }

        public async Task<Result<UserDetailsDto>> UpdateUser(UserDto userDto)
        {
            var user = await _userManager.FindByNameAsync(userDto.UserName);

            if (user != null)
            {
                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Result<UserDetailsDto>.Success(_mapper.Map<UserDetailsDto>(user));
                }
                return Result<UserDetailsDto>.Failure(Messages.UserUpdateError);
            }
            return Result<UserDetailsDto>.Failure(Messages.UserNotFound);
        }
    }
}
