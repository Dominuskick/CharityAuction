using BLL.Models;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddPicture([FromForm] IEnumerable<IFormFile> pictures, [FromQuery] Guid auctionId)
        {
            var pictureDtos = new CreatePictureDto { Pictures = pictures, AuctionId = auctionId };

            var result = await _pictureService.AddPictures(pictureDtos);

            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        [Route("get-picture")]
        public async Task<IActionResult> GetPicture([FromQuery] Guid id)
        {
            var result = await _pictureService.GetPicture(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet]
        [Route("get-all-pictures")]
        public async Task<IActionResult> GetAllPictures([FromQuery] Guid auctionId)
        {
            var result = await _pictureService.GetPictures(auctionId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeletePicture([FromQuery] Guid id)
        {
            var result = await _pictureService.DeletePicture(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdatePictures([FromForm] UpdatePictureDto pictureDto)
        {
            var result = await _pictureService.UpdatePictures(pictureDto);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
