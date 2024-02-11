using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class BidDto
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set;}
        public Guid AuctionId { get; set; }
    }

    public class BidDetailsDto : BidDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
    }

    public class CreateBidDto
    {
        public decimal Amount { get; set; }
        public Guid AuctionId { get; set; }
    }
}
