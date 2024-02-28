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
using Microsoft.AspNetCore.Http;

namespace BLL.Services.Implemantation
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepository auctionRepository;
        private readonly IAuctionCategoryRepository auctionCategoryRepository;
        private readonly ICategoryRepository categoryRepository;
        private readonly IPictureService pictureService;
        private readonly ICurrentUserService currentUserService;
        private readonly IMapper mapper;

        public AuctionService(IAuctionRepository auctionRepository, 
            IMapper mapper,
            IAuctionCategoryRepository auctionCategoryRepository, 
            IPictureService pictureService,
            ICurrentUserService currentUserService,
            ICategoryRepository categoryRepository)
        {
            this.auctionRepository = auctionRepository;
            this.mapper = mapper;
            this.auctionCategoryRepository = auctionCategoryRepository;
            this.pictureService = pictureService;
            this.currentUserService = currentUserService;
            this.categoryRepository = categoryRepository;
        }

        public async Task<Result> CreateAuction(CreateAuctionDto auctionDto, IEnumerable<IFormFile> pictures)
        {
            var categories = await categoryRepository.GetAllAsync();
            var categoryNames = categories.Select(c => c.Name);

            if (!auctionDto.CategoryNames.All(name => categoryNames.Contains(name)))
            {
                return Result.Failure(Messages.Category.CategoryNotFound);
            }

            var auction = mapper.Map<Auction>(auctionDto);
            auction.UserId = currentUserService.UserId;
            var auctionId = auction.Id;
            await auctionRepository.CreateAsync(auction);

            var picturesDto = new CreatePictureDto { Pictures = pictures.Reverse(), AuctionId = auctionId };
            await pictureService.AddPictures(picturesDto);

            // Create AuctionCategory for each category
            foreach (var categoryName in auctionDto.CategoryNames)
            {
                var category = categories.First(c => c.Name == categoryName);
                var auctionCategory = new AuctionCategory
                {
                    AuctionId = auctionId,
                    CategoryName = category.Name
                };
                await auctionCategoryRepository.CreateAsync(auctionCategory);
            }


            return Result.Success();
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> FindAuctions(Func<AuctionDetailsDto, bool> predicate)
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsync();
            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions);

            var filteredAuctions = auctionDtos.Where(predicate);

            return Result<IEnumerable<AuctionDetailsDto>>.Success(filteredAuctions);
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> GetAllAuctions()
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsyncAsNoTracking();

            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions.ToList());


            return Result<IEnumerable<AuctionDetailsDto>>.Success(auctionDtos);
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> GetUsersAuction()
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsync();
            auctions = auctions.Where(a => a.UserId == currentUserService.UserId);
            return Result<IEnumerable<AuctionDetailsDto>>.Success(mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions));
        }

        public async Task<Result<AuctionDetailsDto>> GetAuction(Guid id)
        {
            var auction = await auctionRepository.GetAuctionWithInfoAsync(id);
            var auctionDto = mapper.Map<AuctionDetailsDto>(auction);
            
            return Result<AuctionDetailsDto>.Success(auctionDto);
        }

        public async Task<Result> DeleteAuction(Guid id)
        {
            var auction = await auctionRepository.GetAuctionWithInfoAsync(id);
            if(auction.UserId != currentUserService.UserId)
            {
                return Result.Failure(Messages.Auction.AuctionOwnerError, ErrorType.Unauthorized);
            }
            if(auction.Bids.Any())
            {
                return Result.Failure(Messages.Auction.AuctionDeleteError);
            }
            if (auction == null)
            {
                return Result.Failure(Messages.Auction.AuctionNotFound);
            }
            await auctionRepository.DeleteAsync(id);
            return Result.Success();
        }


        public async Task<Result> UpdateAuction(UpdateAuctionDto auctionDto)
        {
            var auction = await auctionRepository.GetAuctionWithInfoAsync(auctionDto.Id);
            if (auction == null)
            {
                return Result.Failure(Messages.Auction.AuctionNotFound);
            }
            if (auction.StartDate > DateTime.UtcNow)
                return Result.Failure(Messages.Auction.AuctionStarted);

            var categories = await categoryRepository.GetAllAsync();
            var categoryNames = categories.Select(c => c.Name);

            if (!auctionDto.CategoryNames.All(name => categoryNames.Contains(name)))
            {
                return Result.Failure(Messages.Category.CategoryNotFound);
            }

            // Remove old AuctionCategories
            var oldAuctionCategories = auction.AuctionCategories;
            foreach (var oldAuctionCategory in oldAuctionCategories)
            {
                await auctionCategoryRepository.DeleteAsync(oldAuctionCategory.Id);
            }

            // Add new AuctionCategories
            foreach (var categoryName in auctionDto.CategoryNames)
            {
                var category = categories.First(c => c.Name == categoryName);
                var auctionCategory = new AuctionCategory
                {
                    AuctionId = auction.Id,
                    CategoryName = category.Name
                };
                await auctionCategoryRepository.CreateAsync(auctionCategory);
            }

            auction.Title = auctionDto.Title;
            auction.Description = auctionDto.Description;
            auction.StartPrice = auctionDto.StartPrice;
            auction.MinIncrease = auctionDto.MinIncrease;

            // Update the auction in the database
            await auctionRepository.UpdateAsync(auction);

            var updatePictureDto = new UpdatePictureDto { PicturesToAdd = auctionDto.PicturesToAdd.Reverse(), AuctionId = auction.Id };

            var result = await pictureService.UpdatePictures(updatePictureDto);
            if (!result.IsSuccess)
            {
                return Result.Failure(result.Error);
            }
            return Result.Success();
        }


        public async Task<Result<IEnumerable<AuctionDetailsDto>>> FilterAuctions(List<string> categoryNames, string sortOrder)
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsync();
            if (!auctions.Any())
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.Auction.AuctionNotFound);
            }

            // Filtering
            if (categoryNames != null && categoryNames.Count > 0)
            {
                auctions = auctions.Where(auction => auction.AuctionCategories.Any(category => categoryNames.Contains(category.Category.Name)));
                if (!auctions.Any())
                {
                    return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.Category.CategoryNotFound);
                }
            }
            else
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.Category.CategoryNotFound);
            }

            // Sorting
            switch (sortOrder)
            {
                case Messages.SortOrder.Price:
                    auctions = auctions.OrderBy(a => a.StartPrice);
                    break;
                case Messages.SortOrder.PriceDesc:
                    auctions = auctions.OrderByDescending(a => a.StartPrice);
                    break;
                case Messages.SortOrder.Date:
                    auctions = auctions.OrderBy(a => a.StartDate);
                    break;
                case Messages.SortOrder.DateDesc:
                    auctions = auctions.OrderByDescending(a => a.StartDate);
                    break;
                case Messages.SortOrder.IsActive:
                    auctions = auctions.OrderBy(a => a.EndDate > DateTime.UtcNow);
                    break;
                case Messages.SortOrder.IsActiveDesc:
                    auctions = auctions.OrderByDescending(a => a.EndDate > DateTime.UtcNow);
                    break;
                case Messages.SortOrder.IsUnActive:
                    auctions = auctions.OrderBy(a => a.EndDate < DateTime.UtcNow);
                    break;
                case Messages.SortOrder.IsUnActiveDesc:
                    auctions = auctions.OrderByDescending(a => a.EndDate < DateTime.UtcNow);
                    break;
                default:
                    auctions = auctions.OrderBy(a => a.StartDate); // Default sort order
                    break;
            }

            var auctionsDto = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions);

            return Result<IEnumerable<AuctionDetailsDto>>.Success(auctionsDto);
        }

    }
}
