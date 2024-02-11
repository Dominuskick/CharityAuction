using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models.Responses
{
    public class AuthSuccessResponse
    {
        public string UserName { get; set; }
        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}
