using AutoMapper;
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
            try
            {
                await categoryRepository.CreateAsync(mapper.Map<Category>(categoryDto));
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }

        }

        public Task<Result> DeleteCategory(CategoryDto categoryDto)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CategoryDto>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<Result<CategoryDto>> GetById(Guid id)
        {
            try
            {
                var result = await categoryRepository.GetAsync(id);
                return Result<CategoryDto>.Success(mapper.Map<CategoryDto>(result));
            }
            catch(Exception ex)
            {
                return Result<CategoryDto>.Failure(ex.Message);
            }
        }
    }
}
