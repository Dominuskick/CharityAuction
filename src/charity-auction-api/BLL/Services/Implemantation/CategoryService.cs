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

        public async Task<Result> DeleteCategory(Guid id)
        {
            var result = await categoryRepository.GetAsync(id);
            if(result is null)
            {
                return Result.Failure(Messages.CategoryNotFound);
            }
            await categoryRepository.DeleteAsync(id);
            return Result.Success();
        }

        public async Task<Result<IEnumerable<CategotyDetailsDto>>> GetAll()
        {
            var categories = await categoryRepository.GetAllAsync();
            if (categories == null)
            {
                return Result<IEnumerable<CategotyDetailsDto>>.Failure("No categories found");
            }

            var categoryDtos = mapper.Map<IEnumerable<CategotyDetailsDto>>(categories);
            if (categoryDtos == null)
            {
                return Result<IEnumerable<CategotyDetailsDto>>.Failure("Mapping failed");
            }

            return Result<IEnumerable<CategotyDetailsDto>>.Success(categoryDtos);
        }

        public async Task<Result<CategotyDetailsDto>> GetById(Guid id)
        {
            var result = await categoryRepository.GetAsync(id);
            if (result != null)
            {
                var map = mapper.Map<CategotyDetailsDto>(result);
                if(map != null)
                    return Result<CategotyDetailsDto>.Success(map);
                else return Result<CategotyDetailsDto>.Failure(Messages.MappingError);
            }
            else
            {
                return Result<CategotyDetailsDto>.Failure(Messages.AuctionNotFound);
            }
        }
    }
}
