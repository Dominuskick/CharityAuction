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
        private readonly IBidRepository bidRepository;
        private readonly IMapper mapper;

        public AuctionService(IAuctionRepository auctionRepository, IMapper mapper, UserManager<User> userManager, ICategoryRepository categoryRepository, IBidRepository bidRepository, IPictureService pictureService)
        {
            this.auctionRepository = auctionRepository;
            this.mapper = mapper;
            this.categoryRepository = categoryRepository;
            this.bidRepository = bidRepository;
            this.pictureService = pictureService;
        }

        public async Task<Result> CreateAuction(CreateAuctionDto auctionDto, string userId, IEnumerable<IFormFile> pictures)
        {
            var categoryExists = await categoryRepository.FindAsync(a => a.Name == auctionDto.CategoryName);

            if (!categoryExists.Any())
            {
                return Result.Failure(Messages.CategoryNotFound);
            }
            var category = categoryExists.FirstOrDefault();
            var auction = new AuctionDto
            {
                Title = auctionDto.Title,
                Description = auctionDto.Description,
                StartPrice = auctionDto.StartPrice,
                MinIncrease = auctionDto.MinIncrease,
                CategoryId = category.Id,
                CurrentPrice = auctionDto.StartPrice,
                UserId = userId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(ApplicationConstants.AuctionExpirationTimeInDays)
            };


            var createdAuction = mapper.Map<Auction>(auction);
            await auctionRepository.CreateAsync(createdAuction);

            var auctionId = createdAuction.Id;

            var picturesDto = new CreatePictureDto { Pictures = pictures, AuctionId = auctionId };
            await pictureService.AddPictures(picturesDto);
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

            foreach (var auctionDto in filteredAuctions)
            {
                var pictures = await pictureService.GetPictures(auctionDto.Id);
                if (pictures.IsSuccess)
                    auctionDto.Pictures = pictures.Data.Select(p => p.Url).ToList();
                else auctionDto.Pictures = null;
            }
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
            if (auctionDtos == null)
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure("No auctions found");
            }

            foreach (var auctionDto in auctionDtos)
            {
                var pictures = await pictureService.GetPictures(auctionDto.Id);
                if(pictures.IsSuccess)
                auctionDto.Pictures = pictures.Data.Select(p => p.Url).ToList();
                else auctionDto.Pictures = null;
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
            var pictures = await pictureService.GetPictures(auctionDto.Id);
            if(pictures.IsSuccess)
                auctionDto.Pictures = pictures.Data.Select(p => p.Url).ToList();
            else auctionDto.Pictures = null;

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
            var categories = await categoryRepository.FindAsync(c => c.Name == auctionDto.CategoryName);
            if(!categories.Any()) return Result.Failure("No category found with the provided name");
            var category = categories.FirstOrDefault();
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
            auction.CurrentPrice = auctionDto.StartPrice;
            auction.CategoryId = category.Id;
            

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
            var auctions = await auctionRepository.GetAllAsync();
            if (!auctions.Any())
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.AuctionNotFound);
            }

            // Filtering
            if (categoryNames != null && categoryNames.Count > 0)
            {
                var categories = await categoryRepository.FindAsync(c => categoryNames.Contains(c.Name));
                var categoryIds = categories.Select(c => c.Id).ToList();
                auctions = auctions.Where(a => categoryIds.Contains(a.CategoryId));
            }
            else
            {
                return Result<IEnumerable<AuctionDetailsDto>>.Failure(Messages.CategoryNotFound);
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

            foreach (var auctionDto in auctionsDto)
            {
                var pictures = await pictureService.GetPictures(auctionDto.Id);
                if (pictures.IsSuccess)
                    auctionDto.Pictures = pictures.Data.Select(p => p.Url).ToList();
                else auctionDto.Pictures = null;
            }

            return Result<IEnumerable<AuctionDetailsDto>>.Success(auctionsDto);
        }

    }
}
