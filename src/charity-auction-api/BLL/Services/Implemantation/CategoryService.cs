using AutoMapper;
using BLL.Constants;
using BLL.Models;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implemantation
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        public async Task<Result> AddCategory(CategoryDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);

            await categoryRepository.CreateAsync(category);
            return Result.Success();
        }

        public async Task<Result> DeleteCategory(string name)
        {
            var result = await categoryRepository.GetAsync(name);
            if(result is null)
            {
                return Result.Failure(Messages.Category.CategoryNotFound);
            }
            await categoryRepository.DeleteAsync(name);
            return Result.Success();
        }

        public async Task<Result<IEnumerable<CategoryDto>>> GetAll()
        {
            var categories = await categoryRepository.GetAllAsync();
            if (categories == null)
            {
                return Result<IEnumerable<CategoryDto>>.Failure(Messages.Category.CategoryNotFound);
            }

            var categoryDtos = mapper.Map<IEnumerable<CategoryDto>>(categories);
            
            return Result<IEnumerable<CategoryDto>>.Success(categoryDtos);
        }

        public async Task<Result<CategoryDto>> GetById(string name)
        {
            var result = await categoryRepository.GetAsync(name);
            if (result != null)
            {
                var map = mapper.Map<CategoryDto>(result);
                return Result<CategoryDto>.Success(map);
            }
            else
            {
                return Result<CategoryDto>.Failure(Messages.Auction.AuctionNotFound);
            }
        }

    }
}
