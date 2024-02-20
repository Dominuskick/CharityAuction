using BLL.Models.Responses;
using BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace BLL.Services.Interfaces
{
    public interface IAuctionService
    {
        public Task<Result<IEnumerable<AuctionDetailsDto>>> GetAllAuctions();
        public Task<Result<AuctionDetailsDto>> GetAuction(Guid id);
        public Task<Result<IEnumerable<AuctionDetailsDto>>> FindAuctions(Func<AuctionDetailsDto, bool> predicate);
        public Task<Result> CreateAuction(CreateAuctionDto auctionDto, IEnumerable<IFormFile> pictures);
        Task<Result> DeleteAuction(Guid id);
        public Task<Result> UpdateAuction(UpdateAuctionDto auctionDto);
        Task<Result<IEnumerable<AuctionDetailsDto>>> FilterAuctions(List<string> categoryNames, string sortOrder);
        Task<Result<IEnumerable<AuctionDetailsDto>>> GetUsersAuction();
    }
}
