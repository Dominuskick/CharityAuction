using Xunit;
using Moq;
using BLL.Services.Implemantation;
using DAL.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using BLL.Models;
using System.Linq;
using System;
using BLL.Services.Interfaces;

namespace Tests
{
    public class AuctionTests
    {
        /*private readonly Mock<IAuctionRepository> _auctionRepositoryMock;
        private readonly Mock<ICategoryRepository> _categoryRepositoryMock;
        private readonly Mock<IPictureService> _pictureServiceMock;
        private readonly Mock<IBidRepository> _bidRepositoryMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly AuctionService _auctionService;

        public AuctionTests()
        {
            _auctionRepositoryMock = new Mock<IAuctionRepository>();
            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _pictureServiceMock = new Mock<IPictureService>();
            _bidRepositoryMock = new Mock<IBidRepository>();
            _mapperMock = new Mock<IMapper>();
            _auctionService = new AuctionService(_auctionRepositoryMock.Object, _mapperMock.Object, null, _categoryRepositoryMock.Object, _bidRepositoryMock.Object, _pictureServiceMock.Object);
        }

        [Fact]
        public async void TestCreateAuction()
        {
            // Arrange
            var auctionDto = new CreateAuctionDto();
            var userId = "testUserId";
            var pictures = new List<IFormFile>();

            // Act
            var result = await _auctionService.CreateAuction(auctionDto, pictures);

            // Assert
            Assert.NotNull(result);
        }*/

    }
}
