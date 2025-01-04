using azkindle.api.DTO;
using azkindle.api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace azkindle.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _admin;
        public AdminController(IAdminService admin)
        {
            _admin = admin;

        }

        [HttpPost("save-book")]
        public async Task<ActionResult> SaveBook([FromForm] BookDTO req)
        {
            return Ok(await _admin.SaveBook(req));
        }
        [HttpDelete("delete-book")]
        public async Task<ActionResult> DeleteBook(int bookId)
        {
            return Ok(await _admin.DeleteBook(bookId));
        }
        
        [HttpGet("get-users")]
        public async Task<ActionResult> GetUsers()
        {
            var req = new UserDTO();
            return Ok(await _admin.GetUsers(req));
        }
        [HttpGet("get-orders")]
        public async Task<ActionResult> GetOrders()
        {
            var req = new OredrsDTO();
            return Ok(await _admin.GetOrders(req));
        }
    }
}
