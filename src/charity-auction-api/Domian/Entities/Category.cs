﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category
    {
        public string Name { get; set; }
        public ICollection<AuctionCategory> AuctionCategories { get; set; } = new HashSet<AuctionCategory>();

    }
}
