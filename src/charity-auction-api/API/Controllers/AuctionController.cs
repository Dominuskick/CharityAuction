using BLL.Models;
using BLL.Services.Interfaces;
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

        [HttpPost]
        public async Task<IActionResult> CreateAuction([FromBody] AuctionDto auctionDto)
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
            var auctionDto = await auctionService.GetAuction(id);
            if (auctionDto != null)
            {
                return Ok(auctionDto);
            }
            return NotFound();
        }

        // Add other actions here...
    }
}
