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
        private readonly UserManager<User> userManager;
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public AuctionService(IAuctionRepository auctionRepository, IMapper mapper, UserManager<User> userManager, ICategoryRepository categoryRepository)
        {
            this.auctionRepository = auctionRepository;
            this.mapper = mapper;
            this.userManager = userManager;
            this.categoryRepository = categoryRepository;
        }

        public async Task<Result> CreateAuction(CreateAuctionDto auctionDto)
        {
            var userExists = await userManager.FindByIdAsync(auctionDto.UserId);
            var categoryExists = await categoryRepository.GetAsync(auctionDto.CategoryId);

            if (userExists is null)
            {
                return Result.Failure(Messages.UserNotFound);
            }

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
                UserId = auctionDto.UserId,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(ApplicationConstants.AuctionExpirationTimeInDays)
            };
            await auctionRepository.CreateAsync(mapper.Map<Auction>(auction));
            return Result.Success();
        }

        public async Task<Result<IEnumerable<AuctionDto>>> FindAuctions(Func<AuctionDto, bool> predicate)
        {
            var auctions = await auctionRepository.GetAllAsync();
            if (auctions == null)
            {
                return Result<IEnumerable<AuctionDto>>.Failure("No auctions found");
            }

            var auctionDtos = mapper.Map<IEnumerable<AuctionDto>>(auctions);
            if (auctionDtos == null)
            {
                return Result<IEnumerable<AuctionDto>>.Failure("Mapping failed");
            }

            var filteredAuctions = auctionDtos.Where(predicate);
            return Result<IEnumerable<AuctionDto>>.Success(filteredAuctions);
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> GetAllAuctions()
        {
            var auctions = await auctionRepository.GetAllAsync();
            if (auctions == null)
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure("No auctions found");
            }

            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions);
            if (auctionDtos == null)
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure("Mapping failed");
            }

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
            if (auctionDto == null)
            {
                return Result<AuctionDetailsDto>.Failure("Mapping failed");
            }

            return Result<AuctionDetailsDto>.Success(auctionDto);
        }


    }
}
