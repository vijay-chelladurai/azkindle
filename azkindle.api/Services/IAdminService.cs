using azkindle.api.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace azkindle.api.Services
{
    public interface IAdminService
    {
        Task<ResultDTO<string>> SaveBook(BookDTO req);
        Task<ResultDTO<List<UserDTO>>> GetUsers(UserDTO req);
        Task<ResultDTO<string>> DeleteBook(int bookId);
        Task<ResultDTO<List<OredrsDTO>>> GetOrders(OredrsDTO req);

    }
}
