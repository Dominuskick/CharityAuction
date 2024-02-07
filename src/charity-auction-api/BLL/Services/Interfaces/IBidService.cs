using BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IBidService
    {
        public Task<BidDto> CreateBid(BidDto bidDto);
        public Task<BidDto> UpdateBid(BidDto bidDto);
        public Task<bool> DeleteBid(Guid id);
        public Task<bool> GetBid(Guid id);
        public Task<IEnumerable<BidDto>> GetAllBids();

    }
}
