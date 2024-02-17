using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace DAL.Configurations
{
    public class PictureConfiguration : IEntityTypeConfiguration<Picture>
    {
        public void Configure(EntityTypeBuilder<Picture> builder)
        {
            builder
                .ToTable("Pictures");

            builder
                .HasKey(p => p.Id);
            builder
                .Property(p => p.Id)
                .HasDefaultValueSql("newid()");

            builder
                .Property(p => p.Url)
                .IsRequired()
                .HasMaxLength(ModelConstants.Picture.UrlMaxLength);

            builder
                .Property(p => p.AuctionId)
                .IsRequired();
        }
    }
}
