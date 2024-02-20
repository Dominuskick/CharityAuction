using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IBidRepository : IBaseRepository<Bid, Guid>
    {
        Task<IQueryable<Bid>> GetBidsWithInfoAsync();

        Task<Bid> GetBidWithInfoAsync(Guid id);
        Task<IEnumerable<Bid>> GetBidsWithInfoAsyncAsNoTracking();
    }
}
