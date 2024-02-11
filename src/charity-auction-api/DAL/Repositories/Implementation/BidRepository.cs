using DAL.Repositories.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementation
{
    public class BidRepository : BaseRepository<Bid, Guid>, IBidRepository
    {
        public BidRepository(DbContext context) : base(context)
        {
        }
    }
}
