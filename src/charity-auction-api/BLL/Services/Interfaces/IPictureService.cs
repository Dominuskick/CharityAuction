using BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IPictureService
    {
        public Task<PictureDto> AddPicture(PictureDto pictureDto);
        public Task<bool> DeletePicture(Guid id);
        public Task<PictureDto> GetPicture(Guid id);
        public Task<IEnumerable<PictureDto>> GetPictures();
    }
}
