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
        public Task<Result<IEnumerable<AuctionDetailsDto>>> GetAllAuctions();
        public Task<Result<AuctionDetailsDto>> GetAuction(Guid id);
        public Task<Result<IEnumerable<AuctionDetailsDto>>> FindAuctions(Func<AuctionDetailsDto, bool> predicate);
        public Task<Result> CreateAuction(CreateAuctionDto auctionDto, string userId);
        Task<Result> DeleteAuction(Guid id);
        public Task<Result> UpdateAuction(UpdateAuctionDto auctionDto);
    }
}
