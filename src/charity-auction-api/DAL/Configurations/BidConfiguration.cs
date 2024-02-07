using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace BLL.Configurations
{
    public class BidConfiguration : IEntityTypeConfiguration<Bid>
    {
        public void Configure(EntityTypeBuilder<Bid> builder)
        {
            builder
                .ToTable("Bids");

            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Id)
                .HasDefaultValueSql("newid()");

            builder
                .Property(p => p.Amount)
                .IsRequired()
                .HasColumnType("decimal(18, 2)")
                .HasDefaultValue(ModelConstants.Bid.MinAmount);

            builder
                .Property(p => p.UserId)
                .IsRequired();

            builder
                .Property(p => p.AuctionId)
                .IsRequired();
        }
    }
}
