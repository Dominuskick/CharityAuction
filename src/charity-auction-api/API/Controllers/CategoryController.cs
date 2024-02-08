using BLL.Models;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CategoryDto categoryDto)
        {
            var result = await _categoryService.AddCategory(categoryDto);
            if (result.IsSuccess)
            {
                return Ok();
            }
            return BadRequest(result.Error);
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory([FromBody] Guid id)
        {
            var result = await _categoryService.DeleteCategory(id);
            if (result.IsSuccess)
            {
                return Ok();
            }
            return BadRequest(result.Error);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAll();
            if(result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return NotFound(result.Error);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _categoryService.GetById(id);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return NotFound(result.Error);
        }
    }
}
