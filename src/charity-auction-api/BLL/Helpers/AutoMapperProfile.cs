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
            CreateMap<Bid, BidDetailsDto>().ReverseMap().IgnoreAllPropertiesWithAnInaccessibleSetter();
            CreateMap<Bid, CreateBidDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Picture, PictureDto>().ReverseMap();
            CreateMap<Category, CategotyDetailsDto>().ReverseMap();
            CreateMap<Auction, AuctionDetailsDto>().ReverseMap();
            CreateMap<Auction, CreateAuctionDto>().ReverseMap();
            CreateMap<Auction, UpdateAuctionDto>().ReverseMap();

            CreateMap<User, UserDetailsDto>();
            /*CreateMap<RegisterDto, UserDetailsDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName));
            CreateMap<LoginDto, UserDetailsDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));*/
            /*CreateMap<UserDetailsDto, RegisterDto>().ReverseMap();
            CreateMap<UserDetailsDto, LoginDto>().ReverseMap();*/
        }
    }
}
