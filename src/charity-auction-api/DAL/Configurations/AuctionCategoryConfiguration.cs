using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using System.Reflection.Emit;

namespace DAL.Configurations
{
    public class AuctionCategoryConfiguration : IEntityTypeConfiguration<AuctionCategory>
    {
        public void Configure(EntityTypeBuilder<AuctionCategory> builder)
        {
            builder
                .HasKey(a => a.Id);

            builder
                .Property(p => p.Id)
                .HasDefaultValueSql("newid()");

            builder
               .HasOne(ac => ac.Auction)
               .WithMany(a => a.AuctionCategories)
               .HasForeignKey(ac => ac.AuctionId);

            builder
                .HasOne(ac => ac.Category)
                .WithMany(c => c.AuctionCategories)
                .HasForeignKey(ac => ac.CategoryName);
        }
    }
}
