using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Picture : Entity
    {
        public string Url { get; set; }
        public Guid AuctionId { get; set; }
        public Auction Auction { get; set; }
    }
}
