using BLL.Models;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
            string userId = User.FindFirstValue("id");


            var result = await auctionService.CreateAuction(auctionDto, userId);
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
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAuctions()
        {
            var result = await auctionService.GetAllAuctions();
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }
        
        [Authorize]
        [HttpGet("auction-user")]
        public async Task<IActionResult> GetAuctionsCurrentUser()
        {
            string userId = User.FindFirstValue("id");
            var result = await auctionService.FindAuctions(a => a.UserId == userId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] Guid id)
        {
            string userId = User.FindFirstValue("id");
            var auction = await auctionService.GetAuction(id);

            if (auction.Data.UserId != userId)
            {
                return Unauthorized();
            }

            var result = await auctionService.DeleteAuction(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuction([FromRoute] Guid id, [FromBody] UpdateAuctionDto auctionDto)
        {
            string userId = User.FindFirstValue("id");
            var auction = await auctionService.GetAuction(id);

            if (auction.Data.UserId != userId)
            {
                return Unauthorized();
            }

            var result = await auctionService.UpdateAuction(auctionDto);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }
    }
}
