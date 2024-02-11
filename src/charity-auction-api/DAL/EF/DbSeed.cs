using Domain.Entities;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.EF
{
    public class DbSeed
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<AuctionDbContext>();
            context.Database.EnsureCreated();
            List<User> users = new List<User>();
            List<Category> categories = new List<Category>();
            if(!context.Users.Any())
            {
                SeedUsers(context);
            }
            if (!context.Auctions.Any())
            {
                SeedAuction(context);
            }
            if (!context.Bids.Any())
            {
                SeedBids(context);
            }
            
        }

        private static List<Bid> SeedBids(AuctionDbContext context)
        {
            var bids = new List<Bid>
            {
                new Bid
                {
                    Amount = 110,
                    Date = DateTime.Now,
                    UserId = Guid.NewGuid().ToString(),
                    AuctionId = Guid.NewGuid()
                },
                new Bid
                {
                    Amount = 210,
                    Date = DateTime.Now,
                    UserId = Guid.NewGuid().ToString(),
                    AuctionId = Guid.NewGuid()
                },
                new Bid
                {
                    Amount = 310,
                    Date = DateTime.Now,
                    UserId = Guid.NewGuid().ToString(),
                    AuctionId = Guid.NewGuid()
                }
            };
            context.Bids.AddRange(bids);

            return bids;
        }

        private static List<Auction> SeedAuction(AuctionDbContext context)
        {
            var auctions = new List<Auction>
            {
                new Auction
                {
                    Title = "Auction 1",
                    Description = "Description 1",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    StartPrice = 100,
                    UserId = Guid.NewGuid().ToString()
                },
                new Auction
                {
                    Title = "Auction 2",
                    Description = "Description 2",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    StartPrice = 200,
                    UserId = Guid.NewGuid().ToString()
    },
                new Auction
                {
                    Title = "Auction 3",
                    Description = "Description 3",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    StartPrice = 300,
                    UserId = Guid.NewGuid().ToString()
                }
            };
            context.Auctions.AddRange(auctions);

            return auctions;
        }

        private static List<User> SeedUsers(AuctionDbContext context)
        {
            var users = new List<User>
            {
                new User
                {
                    UserName = "user1",
                    Email = ""
                }
            };
            context.Users.AddRange(users);

            return users;
        }
    }
}
