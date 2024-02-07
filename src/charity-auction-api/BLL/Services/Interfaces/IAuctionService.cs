using BLL.Models.Responses;
using BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IAuctionService
    {
        public Task<Result<IEnumerable<AuctionDto>>> GetAllAuctions();
        public Task<Result<AuctionDto>> GetAuction(Guid id);
        public Task<Result<IEnumerable<AuctionDto>>> FindAuctions(Func<AuctionDto, bool> predicate);
        public Task<Result> CreateAuction(AuctionDto auctionDto);
    }
}
