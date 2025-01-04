using azkindle.api.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace azkindle.api.Services
{
    public interface IUserService
    {
        Task<ResultDTO<List<BookDTO>>> GetBooks();
        Task<ResultDTO<List<OredrsDTO>>> GetOrders();
        Task<ResultDTO<string>> SaveOrders(int bookId);
        Task<ResultDTO<string>> DeleteOrders(int orderId);


    }
}
