using BLL.Models;
using BLL.Models.Responses;
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
        public async Task<IActionResult> CreateAuction([FromForm] CreateAuctionDto auctionDto)
        {

            var result = await auctionService.CreateAuction(auctionDto, auctionDto.Pictures);
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
            var result = await auctionService.GetUsersAuction();
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
            var result = await auctionService.DeleteAuction(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            if(result.ErrorType == ErrorType.Unauthorized)
            {
                return Unauthorized(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpPut()]
        public async Task<IActionResult> UpdateAuction([FromForm] UpdateAuctionDto auctionDto)
        {
            var result = await auctionService.UpdateAuction(auctionDto);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            if(result.ErrorType == ErrorType.Unauthorized)
            {
                return Unauthorized(result);
            }
            return NotFound(result);
        }
        /// <summary>
        /// Filters and sorts auctions.
        /// </summary>
        /// <param name="categoryNames">Filters auctions by categoryNames. Only auctions whose category matches the specified string will be returned.</param>
        /// <param name="sortOrder">Sorts the auctions by the specified property. Possible values are "price", "price_desc", "date", "date_desc", "isActive", "isActive_desc, IsUnActive, isUnActive_desc".</param>
        /// <returns>A Result object containing a list of filtered and sorted auctions, or an error message if no auctions were found.</returns>
        [HttpGet("filter")]
        public async Task<IActionResult> FilterAuctions([FromQuery] List<string> categoryNames, [FromQuery] string sortOrder)
        {
            var result = await auctionService.FilterAuctions(categoryNames, sortOrder);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }
    }
}
