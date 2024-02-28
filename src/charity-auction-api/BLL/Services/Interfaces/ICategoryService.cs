using BLL.Models;
using BLL.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface ICategoryService
    {
        public Task<Result<CategoryDto>> GetById(string name);
        public Task<Result<IEnumerable<CategoryDto>>> GetAll();
        public Task<Result> AddCategory(CategoryDto categoryDto);
        public Task<Result> DeleteCategory(string name);
    }
}
