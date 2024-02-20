using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IAuctionRepository : IBaseRepository<Auction, Guid>
    {
        Task<IQueryable<Auction>> GetAuctionsWithInfoAsync();

        Task<Auction> GetAuctionWithInfoAsync(Guid id);
        Task<IEnumerable<Auction>> GetAuctionsWithInfoAsyncAsNoTracking();
    }
}
