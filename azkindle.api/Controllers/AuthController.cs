using azkindle.api.DTO;
using azkindle.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace azkindle.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;
        public AuthController(IAuthService auth)
        {
            _auth = auth;

        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO reqLogin)
        {
            return Ok(await _auth.Login(reqLogin));
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(UserDTO req)
        {
            return Ok(await _auth.Register(req));
        }
    }
}
