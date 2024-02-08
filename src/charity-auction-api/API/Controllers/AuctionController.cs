using BLL.Models;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            this.auctionService = auctionService;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateAuction([FromBody] CreateAuctionDto auctionDto)
        {
            var result = await auctionService.CreateAuction(auctionDto);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuction([FromRoute] Guid id)
        {
            var result = await auctionService.GetAuction(id);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return NotFound();
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAuctions()
        {
            var result = await auctionService.GetAllAuctions();
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return NotFound(result.Error);
        }

    }
}
