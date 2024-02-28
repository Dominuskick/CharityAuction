using AutoMapper;
using BLL.Models.Responses;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
using BLL.Models;
using BLL.Models.AppSettings;
using Domain.Entities;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Azure.Core;
using System.Threading;
using BLL.Constants;

namespace BLL.Services.Implemantation
{
    public class PictureService : IPictureService
    {
        private readonly Cloudinary cloudinary;
        private readonly IPictureRepository pictureRepository;
        private readonly IAuctionRepository auctionRepository;
        private readonly ICurrentUserService currentUserService;
        private readonly IMapper mapper;
        private readonly CloudinaryOptions options;

        public PictureService(
            IPictureRepository pictureRepository,
            IAuctionRepository auctionRepository,
            ICurrentUserService currentUserService,
            IMapper mapper,
            IOptions<CloudinaryOptions> options)
        {
            this.pictureRepository = pictureRepository;
            this.auctionRepository = auctionRepository;
            this.currentUserService = currentUserService;
            this.mapper = mapper;
            this.options = options.Value;

            var account = new Account(
                this.options.CloudName,
                this.options.ApiKey,
                this.options.ApiSecret);

            this.cloudinary = new Cloudinary(account);
        }

        public async Task<Result<IEnumerable<PictureDto>>> AddPictures(CreatePictureDto pictureDto)
        {
            var item = await auctionRepository.GetAsync(pictureDto.AuctionId);

            if (item.UserId != currentUserService.UserId)
            {
                return Result<IEnumerable<PictureDto>>.Failure(Messages.Auction.AuctionOwnerError);
            }

            if (!pictureDto.Pictures.Any())
            {
                return Result<IEnumerable<PictureDto>>.Failure(Messages.Picture.PictureNotFound);
            }

            var uploadResults = new ConcurrentBag<ImageUploadResult>();
            foreach (var picture in pictureDto.Pictures)
            {
                var guid = Guid.NewGuid().ToString();
                var uploadParams = new ImageUploadParams
                {
                    PublicId = Guid.NewGuid().ToString(),
                    File = new FileDescription(guid, picture.OpenReadStream()),
                    Folder = $"{pictureDto.AuctionId}",
                    Timestamp = DateTime.UtcNow
                };
                var uploadResult = await this.cloudinary.UploadAsync(uploadParams);
                uploadResults.Add(uploadResult);
            }

            var picturesToAdd = uploadResults.Select(picture => new Picture
            {
                Id = Guid.Parse(picture.PublicId.Substring(picture.PublicId.LastIndexOf('/') + 1)),
                AuctionId = pictureDto.AuctionId,
                Url = picture.SecureUri.AbsoluteUri
            });

            await pictureRepository.CreateRangeAsync(picturesToAdd);

            var result =
                Result<IEnumerable<PictureDto>>.Success(picturesToAdd
                    .Select(p => this.mapper.Map<PictureDto>(p)).ToList());
            return result;
        }

        public async Task<Result<IEnumerable<PictureDto>>> GetPictures(Guid auctionId)
        {
            var pictures = await pictureRepository.FindAsync(p => p.AuctionId == auctionId);
            if (!pictures.Any())
            {
                return Result<IEnumerable<PictureDto>>.Failure(Messages.Picture.PictureNotFound);
            }

            var result =
                Result<IEnumerable<PictureDto>>.Success(mapper.Map<IEnumerable<PictureDto>>(pictures));
    
            return result;
        }

        public async Task<Result<PictureDto>> GetPicture(Guid id)
        {
            var picture = await pictureRepository.GetAsync(id);
            if (picture == null)
            {
                return Result<PictureDto>.Failure(Messages.Picture.PictureNotFound);
            }

            var result = Result<PictureDto>.Success(this.mapper.Map<PictureDto>(picture));
            return result;
        }

        public async Task<Result> DeletePicture(Guid id)
        {
            var picture = await pictureRepository.GetAsync(id);
            if (picture == null)
            {
                return Result.Failure(Messages.Picture.PictureNotFound);
            }
            var auction = await auctionRepository.GetAsync(picture.AuctionId);
            if (auction.UserId != currentUserService.UserId)
            {
                return Result.Failure(Messages.Picture.PictureNotFound);
            }
            await this.cloudinary.DeleteResourcesByPrefixAsync($"{auction.Id}/{picture.Id}");

            await pictureRepository.DeleteAsync(id);
            return Result.Success();
        }

        public async Task<Result> UpdatePictures(UpdatePictureDto pictureDto)
        {
            var auction = await auctionRepository.GetAsync(pictureDto.AuctionId);

            if (auction.UserId != this.currentUserService.UserId)
            { 
                return Result.Failure(Messages.Picture.PictureNotFound);
            }


            /*if (pictureDto.PicturesToRemove.Any())
            {
                foreach (var pictureToRemove in pictureDto.PicturesToRemove)
                {
                    var result = await DeletePicture(pictureToRemove);
                    if(!result.IsSuccess)
                    {
                        return Result.Failure(result.Error);
                    }
                }
            }*/

            if (pictureDto.PicturesToAdd.Any())
            {
                var picturesToRemove = await pictureRepository.FindAsync(p => p.AuctionId == pictureDto.AuctionId);
                foreach (var pictureToRemove in picturesToRemove)
                {
                    await DeletePicture(pictureToRemove.Id);
                }
                var result = await AddPictures(new CreatePictureDto { Pictures = pictureDto.PicturesToAdd, AuctionId = pictureDto.AuctionId });
                if (!result.IsSuccess)
                {
                    return Result.Failure(result.Error);
                }
            }

            return Result.Success();
        }
    }
}
