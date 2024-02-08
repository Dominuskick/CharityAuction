using AutoMapper;
using BLL.Models;
using BLL.Models.Responses;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Auction, AuctionDto>().ReverseMap();
            CreateMap<Bid, BidDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Picture, PictureDto>().ReverseMap();
            CreateMap<Auction, AuctionDetailsDto>().ReverseMap();
            CreateMap<Category, CategotyDetailsDto>().ReverseMap();
            CreateMap<Auction, CreateAuctionDto>().ReverseMap();

            CreateMap<User, UserDto>();
            CreateMap<User, RegisterDto>();
            CreateMap<User, LoginDto>();
            CreateMap<User, UserDetailsDto>();
            /*CreateMap<UserDetailsDto, RegisterDto>();
            CreateMap<UserDetailsDto, LoginDto>();*/
        }
    }
}
