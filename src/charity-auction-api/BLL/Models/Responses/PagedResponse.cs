using System;
using System.Collections.Generic;
using BLL.Constants;

namespace BLL.Models.Responses
{
    public class PagedResponse<T>
    {
        public PagedResponse()
        {
            this.PageNumber = 1;
            this.PageSize = ApplicationConstants.PageSize;
        }

        public PagedResponse(IEnumerable<T> data, int totalDataCountInDatabase)
        {
            this.Data = data;
            this.TotalPages = (int) Math.Ceiling(totalDataCountInDatabase / (double)ApplicationConstants.PageSize);
        }

        public int TotalPages { get; set; }

        public int PageNumber { get; set; }

        public int? PageSize { get; set; }

        public int? NextPage { get; set; }

        public int? PreviousPage { get; set; }

        public IEnumerable<T> Data { get; set; }

        public int TotalDataCount { get; set; }
    }
}