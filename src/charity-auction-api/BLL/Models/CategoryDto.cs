﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class CategoryDto
    {
        public string Name { get; set; }
    }

    public class CategotyDetailsDto : CategoryDto
    {
        public Guid Id { get; set; }
    }
}
