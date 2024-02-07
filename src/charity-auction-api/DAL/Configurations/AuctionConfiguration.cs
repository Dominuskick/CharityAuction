using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace BLL.Configurations
{
    public class AuctionConfiguration : IEntityTypeConfiguration<Auction>
    {
        public void Configure(EntityTypeBuilder<Auction> builder)
        {
            builder
                .ToTable("Auctions");

            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

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
                .IsRequired()
                .HasColumnType("decimal(18, 2)")
                .HasDefaultValue(ModelConstants.Auction.MinMinIncrease);

            builder
                .Property(a => a.StartPrice)
                .IsRequired()
                .HasColumnType("decimal(18, 2)")
                .HasDefaultValue(ModelConstants.Auction.MinStartingPrice);

            builder
                .HasMany(b => b.Bids)
                .WithOne(i => i.Auction)
                .HasForeignKey(i => i.AuctionId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasMany(b => b.Pictures)
                .WithOne(i => i.Auction)
                .HasForeignKey(i => i.AuctionId);

            builder
                .Property(p => p.CategoryId)
                .IsRequired();
        }
    }
}
