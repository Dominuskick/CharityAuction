using BLL.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IUserService
    {
        Task<Result> DeleteUser(Guid id);
        Task<Result<IEnumerable<UserDetailsDto>>> GetAllUsers();
        Task<Result<UserDetailsDto>> GetUser(Guid id);
        Task<Result<UserDetailsDto>> UpdateUser(UserDto userDto);
    }

}
