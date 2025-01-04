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
    public class UserController : ControllerBase
    {
        private readonly IUserService _user;
        public UserController(IUserService user)
        {
            _user = user;

        }

        [HttpPost("save-orders")]
        public async Task<ActionResult> SaveOrders(int bookId)
        {
            return Ok(await _user.SaveOrders(bookId));
        }
        [HttpPost("delete-orders")]
        public async Task<ActionResult> DeleteOrders(int orderId)
        {
            return Ok(await _user.DeleteOrders(orderId));
        }

        [HttpGet("get-books")]
        public async Task<ActionResult> GetBooks()
        {
            return Ok(await _user.GetBooks());
        }
        [HttpGet("get-orders")]
        public async Task<ActionResult> GetOrders()
        {
            return Ok(await _user.GetOrders());
        }
    }
}
