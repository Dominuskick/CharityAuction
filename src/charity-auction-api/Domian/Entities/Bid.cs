using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Bid : Entity
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public Guid AuctionId { get; set; }
        public virtual User User { get; set; }
        public virtual Auction Auction { get; set; }
    }
}
