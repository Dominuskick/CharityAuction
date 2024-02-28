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
    public class AuctionRepository : BaseRepository<Auction, Guid>, IAuctionRepository
    {
        public AuctionRepository(DbContext context) : base(context)
        {
        }

        public async Task<IQueryable<Auction>> GetAuctionsWithInfoAsync()
        {
            return _set
                .Include(a => a.Pictures)
                .Include(a => a.User)
                .Include(a => a.AuctionCategories)
                    .ThenInclude(ac => ac.Category);
        }

        public async Task<IEnumerable<Auction>> GetAuctionsWithInfoAsyncAsNoTracking()
        {
            return await _set
                .Include(a => a.Pictures)
                .Include(a => a.User)
                .Include(a => a.AuctionCategories)
                    .ThenInclude(ac => ac.Category)
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<Auction> GetAuctionWithInfoAsync(Guid id)
        {
            return await _set
                .Include(a => a.Pictures)
                .Include(a => a.AuctionCategories)
                    .ThenInclude(ac => ac.Category)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
