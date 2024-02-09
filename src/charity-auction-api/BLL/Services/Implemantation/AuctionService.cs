using AutoMapper;
using BLL.Models.Responses;
using BLL.Models;
using BLL.Services.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Constants;
using DAL.Repositories.Implementation;
using Microsoft.AspNetCore.Identity;
using DAL.Repositories.Interfaces;

namespace BLL.Services.Implemantation
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepository auctionRepository;
        private readonly ICategoryRepository categoryRepository;
        private readonly IBidRepository bidRepository;
        private readonly IMapper mapper;

        public AuctionService(IAuctionRepository auctionRepository, IMapper mapper, UserManager<User> userManager, ICategoryRepository categoryRepository, IBidRepository bidRepository)
        {
            this.auctionRepository = auctionRepository;
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
            this.bidRepository = bidRepository;
        }

        public async Task<Result> CreateAuction(CreateAuctionDto auctionDto, string userId)
        {
            var categoryExists = await categoryRepository.GetAsync(auctionDto.CategoryId);

            if (categoryExists is null)
            {
                return Result.Failure(Messages.CategoryNotFound);
            }
            var auction = new AuctionDto
            {
                Title = auctionDto.Title,
                Description = auctionDto.Description,
                StartPrice = auctionDto.StartPrice,
                MinIncrease = auctionDto.MinIncrease,
                CategoryId = auctionDto.CategoryId,
                UserId = userId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(ApplicationConstants.AuctionExpirationTimeInDays)
            };
            await auctionRepository.CreateAsync(mapper.Map<Auction>(auction));
            return Result.Success();
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> FindAuctions(Func<AuctionDetailsDto, bool> predicate)
        {
            var auctions = await auctionRepository.GetAllAsync();
            if (auctions == null)
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure("No auctions found");
            }

            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions);

            var filteredAuctions = auctionDtos.Where(predicate);
            return Result<IEnumerable<AuctionDetailsDto>>.Success(filteredAuctions);
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> GetAllAuctions()
        {
            var auctions = await auctionRepository.GetAllAsync();
            if (auctions == null)
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure("No auctions found");
            }

            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions);

            return Result<IEnumerable<AuctionDetailsDto>>.Success(auctionDtos);
        }

        public async Task<Result<AuctionDetailsDto>> GetAuction(Guid id)
        {
            var auction = await auctionRepository.GetAsync(id);
            if (auction == null)
            {
                return Result<AuctionDetailsDto>.Failure("No auction found with the provided id");
            }

            var auctionDto = mapper.Map<AuctionDetailsDto>(auction);

            return Result<AuctionDetailsDto>.Success(auctionDto);
        }

        public async Task<Result> DeleteAuction(Guid id)
        {
            var auction = await auctionRepository.GetAsync(id);
            if(bidRepository.GetAllAsync().Result.Any(b => b.AuctionId == id))
            {
                return Result.Failure("Auction cannot be deleted because it has already been bid on");
            }
            if (auction == null)
            {
                return Result.Failure(Messages.AuctionNotFound);
            }
            await auctionRepository.DeleteAsync(id);
            return Result.Success();
        }


        public async Task<Result> UpdateAuction(UpdateAuctionDto auctionDto)
        {
            var auction = await auctionRepository.GetAsync(auctionDto.Id);
            if (auction == null)
            {
                return Result.Failure("No auction found with the provided id");
            }
            if(auction.StartDate > DateTime.UtcNow)
                return Result.Failure("Auction cannot be updated because it has already been started");
            // Update the properties of the auction
            auction.Title = auctionDto.Title;
            auction.Description = auctionDto.Description;
            auction.StartPrice = auctionDto.StartPrice;

            // Update the auction in the database
            await auctionRepository.UpdateAsync(auction);

            return Result.Success();
        }

    }
}
