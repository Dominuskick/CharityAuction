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

        public Task<IEnumerable<AuctionDto>> FindAuctions(Func<AuctionDto, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AuctionDto>> GetAllAuctions()
        {
            throw new NotImplementedException();
        }

        public async Task<AuctionDto> GetAuction(Guid id)
        {
            var auction = await auctionRepository.GetAsync(id);
            return mapper.Map<AuctionDto>(auction);
        }
    }
}
