using BLL.Constants;

namespace BLL.Models.Responses
{

    public class PaginationFilter
    {
        private const int DefaultPageNumber = 1;

        public PaginationFilter()
        {
            PageNumber = DefaultPageNumber;
            PageSize = ApplicationConstants.PageSize;
        }

        public PaginationFilter(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber < DefaultPageNumber ? DefaultPageNumber : pageNumber;
            PageSize = pageSize >= ApplicationConstants.PageSize || pageSize < 1 ? ApplicationConstants.PageSize : pageSize;
        }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }
    }
}