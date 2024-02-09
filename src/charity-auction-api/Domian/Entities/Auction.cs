using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Auction : Entity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal StartPrice { get; set; }
        public decimal MinIncrease { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Bid> Bids { get; set; } = new HashSet<Bid>();
        public ICollection<Picture> Pictures { get; set; } = new HashSet<Picture>();
    }
}
