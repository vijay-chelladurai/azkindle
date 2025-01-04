using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using azkindle.api.DTO;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using azkindle.api.dbAccess;
using azkindle.api.Common;
using Microsoft.EntityFrameworkCore;
using Azure.Core;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace azkindle.api.Services
{
    public class AdminService : IAdminService
    {
        private readonly AzkindleDbContext _context;
        private readonly IConfiguration _config;
        private readonly ICurrentUser _user;
        public AdminService(AzkindleDbContext context, IConfiguration config, ICurrentUser currentUser)
        {
            _context = context;
            _config = config;
            _user = currentUser;
        }
        public async Task<ResultDTO<string>> SaveBook(BookDTO request)
        {
            var res = new ResultDTO<string>();
            TblBook book = new TblBook();
            book.Author = request.Author;
            book.Stock = request.Stock;
            book.Price = request.Price;
            book.BookName = request.BookName;

            // Convert the uploaded file to a byte array
            byte[] imageData;
            using (var memoryStream = new MemoryStream())
            {
                await request.Image.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }

            book.Image = imageData;

            await _context.TblBooks.AddAsync(book);

            res.Content = "New book successfully added";

            await _context.SaveChangesAsync();

            return res;
        }
        public async Task<ResultDTO<string>> DeleteBook(int bookId)
        {
            var res = new ResultDTO<string>();
            await _context.TblBooks.Where(x => x.Id == bookId).ExecuteDeleteAsync();

            res.Content = "book was removed successfully";
            return res;
        }
        public async Task<ResultDTO<List<UserDTO>>> GetUsers(UserDTO req)
        {

            var res = new ResultDTO<List<UserDTO>>();
            res.Content = await _context.TblUsers
                .Select((y)=> new UserDTO { FullName = y.FullName, Role = y.Role })
                .ToListAsync();

            return res;
        }
        public async Task<ResultDTO<List<OredrsDTO>>> GetOrders(OredrsDTO req)
        {
            ResultDTO<List<OredrsDTO>> res = new();
            res.Content= await _context.TblOrders
             .Join(
                 _context.TblBooks,
                 order => order.BookId,   // Key from TblOrders
                 book => book.Id,         // Key from TblBooks
                 (order, book) => new     // First join result selector
                 {
                     order.Id,
                     order.BookId,
                     order.UserId,
                     BookName = book.BookName,
                     Stock = book.Stock,
                     Price = book.Price,
                     order.DateOfOrder
                 })
             .Join(
                 _context.TblUsers,
                 orderBook => orderBook.UserId, // Key from the first join
                 user => user.Id,               // Key from TblUsers
                 (orderBook, user) => new OredrsDTO // Final projection
                 {
                     Id = orderBook.Id,
                     BookId = orderBook.BookId,
                     BookName = orderBook.BookName,
                     UserId = orderBook.UserId,
                     UserName = user.FullName,
                     Stock=orderBook.Stock,
                     Price=orderBook.Price,
                     DateOfOrder=orderBook.DateOfOrder
                 })
             .ToListAsync();
            return res;
        }

    }
}
