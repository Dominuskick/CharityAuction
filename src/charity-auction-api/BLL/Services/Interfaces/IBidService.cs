using BLL.Models;
using BLL.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IBidService
    {
        Task<Result> CreateBid(CreateBidDto bidDto, string userId);
        Task<Result<IEnumerable<BidDetailsDto>>> GetAllBids();
        Task<Result<BidDetailsDto>> GetBidById(Guid id);
        Task<Result<IEnumerable<BidDetailsDto>>> FindBids(Func<BidDetailsDto, bool> predicate);
        Task<Result<BidDetailsDto>> GetHighestBid(Guid auctionId);
    }
}
