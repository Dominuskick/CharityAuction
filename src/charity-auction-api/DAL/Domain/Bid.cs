﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Domain
{
    public class Bid
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public Guid AuctionId { get; set; }
        public virtual User User { get; set; }
        public virtual Auction Auction { get; set; }
    }
}
