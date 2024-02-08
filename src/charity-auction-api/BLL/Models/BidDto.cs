﻿using System;
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
        public string UserId { get; set; }
        public Guid AuctionId { get; set; }
    }
}