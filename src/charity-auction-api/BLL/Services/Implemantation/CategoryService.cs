using AutoMapper;
using BLL.Constants;
using BLL.Models;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using DAL.Interfaces;
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
            if (categoryDto == null)
            {
                return Result.Failure("CategoryDto is null");
            }

            var category = mapper.Map<Category>(categoryDto);
            if (category == null)
            {
                return Result.Failure("Mapping failed");
            }

            await categoryRepository.CreateAsync(category);
            return Result.Success();
        }

        public async Task<Result> DeleteCategory(CategoryDto categoryDto)
        {
            if (categoryDto == null)
            {
                return Result.Failure("CategoryDto is null");
            }

            var category = mapper.Map<Category>(categoryDto);
            if (category == null)
            {
                return Result.Failure("Mapping failed");
            }

            await categoryRepository.DeleteAsync(category.Id);
            return Result.Success();
        }

        public async Task<Result<IEnumerable<CategoryDto>>> GetAll()
        {
            var categories = await categoryRepository.GetAllAsync();
            if (categories == null)
            {
                return Result<IEnumerable<CategoryDto>>.Failure("No categories found");
            }

            var categoryDtos = mapper.Map<IEnumerable<CategoryDto>>(categories);
            if (categoryDtos == null)
            {
                return Result<IEnumerable<CategoryDto>>.Failure("Mapping failed");
            }

            return Result<IEnumerable<CategoryDto>>.Success(categoryDtos);
        }

        public async Task<Result<CategoryDto>> GetById(Guid id)
        {
            var result = await categoryRepository.GetAsync(id);
            if (result != null)
            {
                var map = mapper.Map<CategoryDto>(result);
                if(map != null)
                    return Result<CategoryDto>.Success(map);
                else return Result<CategoryDto>.Failure(Messages.MappingError);
            }
            else
            {
                return Result<CategoryDto>.Failure(Messages.AuctionNotFound);
            }
        }
    }
}
