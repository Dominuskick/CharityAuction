using DAL.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementation
{
    public class UserRepostory : BaseRepository<User, Guid>, IUserRepository
    {
        public UserRepostory(DbContext context) : base(context)
        {
        }
    }
}
