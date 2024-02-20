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

        public async Task<IQueryable<Bid>> GetBidsWithInfoAsync()
        {
            return _set
                .Include(a => a.User);
        }

        public async Task<IEnumerable<Bid>> GetBidsWithInfoAsyncAsNoTracking()
        {
            return await _set
                .Include(a => a.User)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Bid> GetBidWithInfoAsync(Guid id)
        {
            return await _set
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
