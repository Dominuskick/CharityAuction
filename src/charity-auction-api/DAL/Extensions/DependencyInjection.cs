using DAL.Interfaces;
using BLL.EF;
using DAL.Repositories.Implementation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddDbContext<DbContext, AuctionDbContext>(options =>
                    options.UseSqlServer(configuration.GetDefaultConnectionString()), ServiceLifetime.Scoped);
            /*  .AddIdentity<AuctionUser, IdentityRole>(options =>
              {
                  options.Password.RequireDigit = false;
                  options.Password.RequireLowercase = false;
                  options.Password.RequireNonAlphanumeric = false;
                  options.Password.RequireUppercase = false;

                  options.SignIn.RequireConfirmedEmail = true;
                  options.Lockout.MaxFailedAccessAttempts = 6;
              })
              .AddTokenProvider<FourDigitTokenProvider>(FourDigitTokenProvider.FourDigitEmail)
              .AddEntityFrameworkStores<AuctionSystemDbContext>()
              .AddDefaultTokenProviders();*/
            services.AddScoped<IAuctionRepository, AuctionRepository>();
            services.AddScoped<IBidRepository, BidRepository>();
            services.AddScoped<IPictureRepository, PictureRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            return services;
        }
    }
}
