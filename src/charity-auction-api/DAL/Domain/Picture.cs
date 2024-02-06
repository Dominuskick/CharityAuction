using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Domain
{
    public class Picture
    {
        public Guid Id { get; set; }
        public string Url { get; set; }

        public Guid AuctionId { get; set; }
        public Auction Auction { get; set; }
    }
}
