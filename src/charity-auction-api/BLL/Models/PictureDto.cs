using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class CreatePictureDto
    {
        public IEnumerable<IFormFile> Pictures { get; set; }
        public Guid AuctionId { get; set; }
    }

    public class PictureDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
    }

    public class UpdatePictureDto
    {
        public Guid AuctionId { get; set; }

        public ICollection<IFormFile> PicturesToAdd { get; set; }

        public ICollection<Guid> PicturesToRemove { get; set; }
    }
}
