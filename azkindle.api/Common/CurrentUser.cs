using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace azkindle.api.Common
{
    public interface ICurrentUser
    {
        long Id { get; set; }

    }
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor httpContext;


        public CurrentUser(IHttpContextAccessor context)
        {
            this.httpContext = context;
            var identity = (ClaimsIdentity)context.HttpContext.User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            if (claims != null && claims.Count() > 0)
            {
                var _id = claims.Where(y => y.Type == "userId")
                                .Select(x => x.Value).FirstOrDefault();
                this.Id = long.TryParse(_id, out long id) ? id : 0;

            }
        }

        public long Id { get; set; }

    }
}
