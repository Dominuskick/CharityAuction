using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public ICollection<Auction> Auctions { get; set; }
        public ICollection<Bid> Bids { get; set; }
    }
}
