using AutoMapper;
using BLL.Constants;
using BLL.Models;
using BLL.Models.Responses;
using DAL.Repositories.Implementation;
using DAL.Repositories.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.DependencyInjection;
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
            CreateMap<Bid, BidDetailsDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName));


            CreateMap<Auction, AuctionDetailsDto>()
                .ForMember(dest => dest.Pictures, opt => opt.MapFrom(src => src.Pictures.Select(p => p.Url)))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ReverseMap().IgnoreAllSourcePropertiesWithAnInaccessibleSetter();

            CreateMap<CreateAuctionDto, AuctionDto>()
               .ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom(src => src.StartPrice))
               .ForMember(dest => dest.UserId, opt => opt.Ignore()) // We'll set this manually
               .ForMember(dest => dest.CategoryId, opt => opt.Ignore()) // We'll set this manually
               .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => DateTime.UtcNow))
               .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => DateTime.UtcNow.AddDays(ApplicationConstants.AuctionExpirationTimeInDays)));



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
