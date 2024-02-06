using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Domain;

namespace DAL.Configurations
{
    public class AuctionConfiguration
    {
        public void Configure(EntityTypeBuilder<Auction> builder)
        {
            builder
                .ToTable("Items");

            builder
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(ModelConstants.Auction.TitleMaxLength);

            builder
                .Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(ModelConstants.Auction.DescriptionMaxLength);

            builder
                .Property(p => p.StartDate)
                .IsRequired();

            builder
                .Property(p => p.EndDate)
                .IsRequired();

            builder
                .Property(p => p.UserId)
                .IsRequired();

            builder
                  .Property(a => a.CurrentPrice)
                  .HasComputedColumnSql("[StartPrice]")
                    .IsRequired();

            builder
                .Property(a => a.MinIncrease)
                .IsRequired();

            builder
                .Property(a => a.StartPrice)
                .IsRequired();

            builder
                .HasMany(b => b.Bids)
                .WithOne(i => i.Auction)
                .HasForeignKey(i => i.AuctionId)
                .OnDelete(DeleteBehavior.SetNull);

            builder
                .HasMany(b => b.Pictures)
                .WithOne(i => i.Auction)
                .HasForeignKey(i => i.AuctionId);
        }
    }
}
