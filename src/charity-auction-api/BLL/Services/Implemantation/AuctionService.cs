using AutoMapper;
using BLL.Models.Responses;
using BLL.Models;
using DAL.Interfaces;
using BLL.Services.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implemantation
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepository auctionRepository;
        private readonly IMapper mapper;

        public AuctionService(IAuctionRepository auctionRepository, IMapper mapper)
        {
            this.auctionRepository = auctionRepository;
            this.mapper = mapper;
        }

        public async Task<Result> CreateAuction(AuctionDto auctionDto)
        {
            try
            {
                await auctionRepository.CreateAsync(mapper.Map<Auction>(auctionDto));
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
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

        public async Task<Result<IEnumerable<AuctionDto>>> GetAllAuctions()
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

            return Result<IEnumerable<AuctionDto>>.Success(auctionDtos);
        }

        public async Task<Result<AuctionDto>> GetAuction(Guid id)
        {
            var auction = await auctionRepository.GetAsync(id);
            if (auction == null)
            {
                return Result<AuctionDto>.Failure("No auction found with the provided id");
            }

            var auctionDto = mapper.Map<AuctionDto>(auction);
            if (auctionDto == null)
            {
                return Result<AuctionDto>.Failure("Mapping failed");
            }

            return Result<AuctionDto>.Success(auctionDto);
        }
    }
}
