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
        private readonly ICurrentUserService currentUserService;
        private readonly IMapper mapper;

        public BidService(IBidRepository bidRepository, 
            IMapper mapper, 
            IAuctionRepository auctionRepository,
            ICurrentUserService currentUserService)
        {
            this.bidRepository = bidRepository;
            this.mapper = mapper;
            this.auctionRepository = auctionRepository;
            this.currentUserService = currentUserService;
        }

        public async Task<Result> CreateBid(CreateBidDto bidDto)
        {
            var auction = await auctionRepository.GetAsync(bidDto.AuctionId);
            if(auction is null)
            {
                return Result.Failure(Messages.Auction.AuctionNotFound);
            }
            if(auction.EndDate < DateTime.UtcNow)
            {
                return Result.Failure(Messages.Auction.AuctionEnded);
            }
            if(auction.StartDate > DateTime.UtcNow)
            {
                return Result.Failure(Messages.Auction.AuctionNotStarted);
            }
            if (auction.StartPrice > bidDto.Amount)
            {
                return Result.Failure(Messages.Bid.BidTooLow);
            }

            var highestBid = await GetHighestBid(bidDto.AuctionId);
            if (highestBid.IsSuccess)
            {
                if(highestBid.Data.Amount > bidDto.Amount)
                {
                    return Result.Failure(Messages.Bid.BidTooLow);
                }
                if (highestBid.Data.Amount - auction.MinIncrease > bidDto.Amount)
                {
                    return Result.Failure(Messages.Bid.BidTooLow);
                }
            }
            var bid = new Bid
            {
                Amount = bidDto.Amount,
                AuctionId = bidDto.AuctionId,
                UserId = currentUserService.UserId,
                Date = DateTime.UtcNow
            };

            auction.CurrentPrice = bidDto.Amount;
            await bidRepository.CreateAsync(bid);
            await auctionRepository.UpdateAsync(auction);
            return Result.Success();
        }

        public async Task<Result<IEnumerable<BidDetailsDto>>> GetAllBids()
        {
            var bids = await bidRepository.GetBidsWithInfoAsync();
            if (bids == null)
            {
                return Result<IEnumerable<BidDetailsDto>>.Failure(Messages.Bid.BidNotFound);
            }
            var bidDtos = mapper.Map<IEnumerable<BidDetailsDto>>(bids);

            return Result<IEnumerable<BidDetailsDto>>.Success(bidDtos);
        }

        public async Task<Result<BidDetailsDto>> GetBidById(Guid id)
        {
            var bid = await bidRepository.GetBidWithInfoAsync(id);
            if (bid is null)
            {
                return Result<BidDetailsDto>.Failure(Messages.Bid.BidNotFound);
            }
            var bidDto = mapper.Map<BidDetailsDto>(bid);

            return Result<BidDetailsDto>.Success(bidDto);
        }

        public async Task<Result<IEnumerable<BidDetailsDto>>> FindBids(Func<BidDetailsDto, bool> predicate)
        {
            var bids = await bidRepository.GetBidsWithInfoAsync();
            if (bids == null)
            {
                return Result<IEnumerable<BidDetailsDto>>.Failure(Messages.Auction.AuctionNotFound);
            }

            var bidDtos = mapper.Map<IEnumerable<BidDetailsDto>>(bids);
            

            var filteredBids = bidDtos.Where(predicate);
            return Result<IEnumerable<BidDetailsDto>>.Success(filteredBids);
        }

        public async Task<Result<IEnumerable<BidDetailsDto>>> FindBidsUser()
        {
            return await FindBids(b => b.UserId == currentUserService.UserId);
        }

        public async Task<Result<BidDetailsDto>> GetHighestBid(Guid auctionId)
        {
            var bids = await bidRepository.GetBidsWithInfoAsync();
            bids = bids.Where(bids => bids.AuctionId == auctionId);
            if (!bids.Any())
            {
                return Result<BidDetailsDto>.Failure(Messages.Bid.BidNotFound);
            }
            var highestBid = bids.OrderByDescending(b => b.Amount).FirstOrDefault();
            var bidDto = mapper.Map<BidDetailsDto>(highestBid);

            return Result<BidDetailsDto>.Success(bidDto);
        }
    }
}
