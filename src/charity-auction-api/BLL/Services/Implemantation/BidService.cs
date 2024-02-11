using AutoMapper;
using BLL.Constants;
using BLL.Models;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using DAL.Repositories.Implementation;
using DAL.Repositories.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implemantation
{

    public class BidService : IBidService
    {
        private readonly IBidRepository bidRepository;
        private readonly IAuctionRepository auctionRepository;
        private readonly IMapper mapper;

        public BidService(IBidRepository bidRepository, IMapper mapper, IAuctionRepository auctionRepository)
        {
            this.bidRepository = bidRepository;
            this.mapper = mapper;
            this.auctionRepository = auctionRepository;
        }

        public async Task<Result> CreateBid(CreateBidDto bidDto, string userId)
        {
            var auction = await auctionRepository.GetAsync(bidDto.AuctionId);
            if(auction is null)
            {
                return Result.Failure(Messages.AuctionNotFound);
            }
            if(auction.EndDate < DateTime.UtcNow)
            {
                return Result.Failure(Messages.AuctionEnded);
            }
            if(auction.StartDate > DateTime.UtcNow)
            {
                return Result.Failure(Messages.AuctionNotStarted);
            }
            if (auction.StartPrice > bidDto.Amount)
            {
                return Result.Failure(Messages.BidTooLow);
            }

            var highestBid = await GetHighestBid(bidDto.AuctionId);
            if (highestBid.IsSuccess)
            {
                if(highestBid.Data.Amount > bidDto.Amount)
                {
                    return Result.Failure(Messages.BidTooLow);
                }
                if (highestBid.Data.Amount - auction.MinIncrease > bidDto.Amount)
                {
                    return Result.Failure(Messages.BidTooLow);
                }
            }
            var bid = new Bid
            {
                Amount = bidDto.Amount,
                AuctionId = bidDto.AuctionId,
                UserId = userId,
                Date = DateTime.UtcNow
            };

            auction.CurrentPrice = bidDto.Amount;
            await bidRepository.CreateAsync(bid);
            await auctionRepository.UpdateAsync(auction);
            return Result.Success();
        }

        public async Task<Result<IEnumerable<BidDetailsDto>>> GetAllBids()
        {
            var bids = await bidRepository.GetAllAsync();
            return Result<IEnumerable<BidDetailsDto>>.Success(mapper.Map<IEnumerable<BidDetailsDto>>(bids));
        }

        public async Task<Result<BidDetailsDto>> GetBidById(Guid id)
        {
            var bid = await bidRepository.GetAsync(id);
            if (bid is null)
            {
                return Result<BidDetailsDto>.Failure("Bid not found");
            }
            return Result<BidDetailsDto>.Success(mapper.Map<BidDetailsDto>(bid));
        }

        public async Task<Result<IEnumerable<BidDetailsDto>>> FindBids(Func<BidDetailsDto, bool> predicate)
        {
            var bids = await bidRepository.GetAllAsync();
            if (bids == null)
            {
                return Result<IEnumerable<BidDetailsDto>>.Failure(Messages.AuctionNotFound);
            }

            var bidDtos = mapper.Map<IEnumerable<BidDetailsDto>>(bids);

            var filteredBids = bidDtos.Where(predicate);
            return Result<IEnumerable<BidDetailsDto>>.Success(filteredBids);
        }

        public async Task<Result<BidDetailsDto>> GetHighestBid(Guid auctionId)
        {
            var bids = await bidRepository.FindAsync(b => b.AuctionId == auctionId);
            if (!bids.Any())
            {
                return Result<BidDetailsDto>.Failure(Messages.BidNotFound);
            }
            var highestBid = bids.OrderByDescending(b => b.Amount).FirstOrDefault();
            var result = mapper.Map<BidDetailsDto>(highestBid);
            return Result<BidDetailsDto>.Success(result);
        }
    }
}
