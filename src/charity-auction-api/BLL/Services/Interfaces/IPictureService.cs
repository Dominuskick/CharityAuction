using BLL.Models;
using BLL.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IPictureService
    {
        Task<Result<IEnumerable<PictureDto>>> AddPictures(CreatePictureDto pictureDto);
        Task<Result<PictureDto>> GetPicture(Guid id);
        Task<Result<IEnumerable<PictureDto>>> GetPictures(Guid auctionId);
        Task<Result> DeletePicture(Guid id);
        Task<Result> UpdatePictures(UpdatePictureDto pictureDto);
    }
}
