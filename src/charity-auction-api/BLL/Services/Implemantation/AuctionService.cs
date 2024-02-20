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
        private readonly ICategoryRepository categoryRepository;
        private readonly IPictureService pictureService;
        private readonly ICurrentUserService currentUserService;
        private readonly IMapper mapper;

        public AuctionService(IAuctionRepository auctionRepository, 
            IMapper mapper, 
            ICategoryRepository categoryRepository, 
            IPictureService pictureService,
            ICurrentUserService currentUserService)
        {
            this.auctionRepository = auctionRepository;
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
            this.pictureService = pictureService;
            this.currentUserService = currentUserService;
        }

        public async Task<Result> CreateAuction(CreateAuctionDto auctionDto, IEnumerable<IFormFile> pictures)
        {
            var categoryExists = await categoryRepository.FindAsync(a => a.Name == auctionDto.CategoryName);

            if (!categoryExists.Any())
            {
                return Result.Failure(Messages.Category.CategoryNotFound);
            }
            var category = categoryExists.FirstOrDefault();

            var auction = mapper.Map<AuctionDto>(auctionDto);
            auction.CategoryId = category.Id;
            auction.UserId = currentUserService.UserId;

            var createdAuction = mapper.Map<Auction>(auction);
            await auctionRepository.CreateAsync(createdAuction);

            var auctionId = createdAuction.Id;

            var picturesDto = new CreatePictureDto { Pictures = pictures, AuctionId = auctionId };
            await pictureService.AddPictures(picturesDto);
            return Result.Success();
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> FindAuctions(Func<AuctionDetailsDto, bool> predicate)
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsync();
            if (!auctions.Any())
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.Auction.AuctionNotFound);
            }

            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions);

            var filteredAuctions = auctionDtos.Where(predicate);

            return Result<IEnumerable<AuctionDetailsDto>>.Success(filteredAuctions);
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> GetAllAuctions()
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsyncAsNoTracking();
            if (!auctions.Any())
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.Auction.AuctionNotFound);
            }

            var auctionDtos = mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions.ToList());


            return Result<IEnumerable<AuctionDetailsDto>>.Success(auctionDtos);
        }

        public async Task<Result<IEnumerable<AuctionDetailsDto>>> GetUsersAuction()
        {
            var auctions = await auctionRepository.GetAuctionsWithInfoAsync();
            auctions = auctions.Where(a => a.UserId == currentUserService.UserId);
            if (!auctions.Any())
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.Auction.AuctionNotFound);
            }
            return Result<IEnumerable<AuctionDetailsDto>>.Success(mapper.Map<IEnumerable<AuctionDetailsDto>>(auctions));
        }

        public async Task<Result<AuctionDetailsDto>> GetAuction(Guid id)
        {
            var auction = await auctionRepository.GetAuctionWithInfoAsync(id);
            if (auction == null)
            {
                return Result<AuctionDetailsDto>.Failure(Messages.Auction.AuctionNotFound);
            }

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
            if(auctionDto.CategoryName != auction.Category.Name)
            {
                var categoryExists = await categoryRepository.FindAsync(a => a.Name == auctionDto.CategoryName);
                if (!categoryExists.Any())
                {
                    return Result.Failure(Messages.Category.CategoryNotFound);
                }
                var category = categoryExists.FirstOrDefault();
                auction.CategoryId = category.Id;
            }

            auction.Title = auctionDto.Title;
            auction.Description = auctionDto.Description;
            auction.StartPrice = auctionDto.StartPrice;
            auction.MinIncrease = auctionDto.MinIncrease;

            // Update the auction in the database
            await auctionRepository.UpdateAsync(auction);
            var auctionId = auction.Id;

            var updatePictureDto = new UpdatePictureDto { PicturesToAdd = auctionDto.PicturesToAdd, AuctionId = auctionId };

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
                auctions = auctions.Where(auctions => categoryNames.Contains(auctions.Category.Name));
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
