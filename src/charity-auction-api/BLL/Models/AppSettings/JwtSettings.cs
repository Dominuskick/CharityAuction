using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models.AppSettings
{
    public class JwtSettings
    {
        public string Key { get; set; }

        public TimeSpan TokenLifetime { get; set; }
    }
}
