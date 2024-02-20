using System;
using System.Security.Claims;
using System.Threading.Tasks;
using BLL.Models;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidService bidService;

        public BidController(IBidService bidService)
        {
            this.bidService = bidService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBids()
        {
            var result = await bidService.GetAllBids();
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBidById(Guid id)
        {
            var result = await bidService.GetBidById(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBid([FromBody] CreateBidDto bidDto)
        {
            var result = await bidService.CreateBid(bidDto);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Authorize]
        [HttpGet]
        [Route("bids-user")]
        public async Task<IActionResult> GetBidsCurrentUser()
        {
            var result = await bidService.FindBidsUser();
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet]
        [Route("bids-auction")]
        public async Task<IActionResult> GetBidsAuction(Guid auctionId)
        {
            var result = await bidService.FindBids(b => b.AuctionId == auctionId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet]
        [Route("bids-highest-auction")]
        public async Task<IActionResult> GetHighestBid(Guid auctionId)
        {
            var result = await bidService.GetHighestBid(auctionId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result);
        }
    }
}