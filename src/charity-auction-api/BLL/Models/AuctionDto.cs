using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class CreateAuctionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal StartPrice { get; set; }
        public decimal MinIncrease { get; set; }
        public IEnumerable<string> CategoryNames { get; set; }

        [FromForm]
        public IEnumerable<IFormFile> Pictures { get; set; }
    }

    public class AuctionDetailsDto : AuctionDto
    {
        public Guid Id { get; set; }
        public IEnumerable<string> Pictures { get; set; }
        public IEnumerable<string> CategoryNames { get; set; }
        public string UserName { get; set; }
    }

    public class AuctionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal StartPrice { get; set; }
        public decimal CurrentPrice { get; set; }
        public decimal MinIncrease { get; set; }
        public string UserId { get; set; }

    }

    public class UpdateAuctionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal StartPrice { get; set; }
        public decimal MinIncrease { get; set; }
        public IEnumerable<string> CategoryNames { get; set; }
        public IEnumerable<IFormFile> PicturesToAdd { get; set; }
    }
}
