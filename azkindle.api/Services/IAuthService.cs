using azkindle.api.DTO;
using System.Threading.Tasks;

namespace azkindle.api.Services
{
    public interface IAuthService
    {
        Task<ResultDTO<string>> Login(LoginDTO user);
        Task<ResultDTO<string>> Register(UserDTO req);
    }
}
