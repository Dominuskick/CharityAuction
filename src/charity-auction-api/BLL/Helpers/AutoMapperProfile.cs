using AutoMapper;
using BLL.Models;
using BLL.Models.Responses;
using DAL.Repositories.Implementation;
using DAL.Repositories.Interfaces;
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
            CreateMap<Bid, BidDto>().ReverseMap();
            CreateMap<Bid, CreateBidDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, CategotyDetailsDto>().ReverseMap();

            CreateMap<Auction, AuctionDto>().ReverseMap();
            CreateMap<Auction, AuctionDetailsDto>()
                .ForMember(dest => dest.Pictures, opt => opt.Ignore());
            CreateMap<Bid, BidDetailsDto>()
                .ForMember(dest => dest.UserName, opt => opt.Ignore());



            CreateMap<Picture, PictureDto>();




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
