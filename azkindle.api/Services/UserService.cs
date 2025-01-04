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
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Collections.Generic;
using Azure.Core;
using System.Net;

namespace azkindle.api.Services
{
    public class UserService : IUserService
    {
        private readonly AzkindleDbContext _context;
        private readonly IConfiguration _config;
        private readonly ICurrentUser _user;
        public UserService(AzkindleDbContext context, IConfiguration config, ICurrentUser currentUser)
        {
            _context = context;
            _config = config;
            _user = currentUser;
        }
        public async Task<ResultDTO<string>> SaveOrders(int bookId)
        {

            var result = new ResultDTO<string>();
            if (await _context.TblOrders.AnyAsync((x)=>x.UserId==_user.Id && x.BookId == bookId))
            {
                throw new ArgumentException("You are already taken this book");
            }
            if (await _context.TblBooks.AnyAsync((x) => x.Id == bookId && x.Stock==0))
            {
                throw new ArgumentException("Stock out");
            }

            TblOrder order = new TblOrder();
            order.UserId = _user.Id;
            order.BookId = bookId;
            order.DateOfOrder = DateTime.Now;
            await _context.TblOrders.AddAsync(order);

            var book = await _context.TblBooks.FirstOrDefaultAsync(b => b.Id == bookId);
            book.Stock = book.Stock > 0 ? book.Stock - 1 : 0;

                await _context.SaveChangesAsync();

            result.Content = "Thank you for taking this book";
            return result;
        }
        public async Task<ResultDTO<string>> DeleteOrders(int orderId)
        {
            var result = new ResultDTO<string>();

            var order = await _context.TblOrders.FirstOrDefaultAsync(o => o.Id == orderId);
            var book = await _context.TblBooks.FirstOrDefaultAsync(b => b.Id == order.BookId);
            book.Stock += 1;
            _context.TblBooks.Update(book);
            _context.TblOrders.Remove(order);
            await _context.SaveChangesAsync();

            result = new ResultDTO<string>();
            result.Content = "Book return was successfull";
            return result;
        }
        public async Task<ResultDTO<List<BookDTO>>> GetBooks()
        {
            var result = new ResultDTO<List<BookDTO>>();

            result.Content= await _context.TblBooks.Select((x) => new BookDTO
            {
                BookName = x.BookName,
                Author = x.Author,
                Id = x.Id,
                Stock = x.Stock,
                Price = x.Price,
                ImageBase64 = x.Image != null ? Convert.ToBase64String(x.Image) : null
            }).ToListAsync();

            return result;
        }
        public async Task<ResultDTO<List<OredrsDTO>>> GetOrders()
        {
            var result = new ResultDTO<List<OredrsDTO>>();

            result.Content= await _context.TblOrders
              .Join(
                _context.TblBooks,
                order => order.BookId, // Key from TblOrders
                book => book.Id, // Key from TblBooks
                (order, book) => new // First join result selector
                {
                    order.Id,
                    order.BookId,
                    order.UserId,
                    order.DateOfOrder, // Include these properties for the final projection
                    book.Price,
                    BookName = book.BookName
                })
              .Join(
                _context.TblUsers,
                orderBook => orderBook.UserId, // Key from the first join
                user => user.Id, // Key from TblUsers
                (orderBook, user) => new OredrsDTO // Final projection
                {
                    Id = orderBook.Id,
                    BookId = orderBook.BookId,
                    BookName = orderBook.BookName,
                    DateOfOrder = orderBook.DateOfOrder, // Use properties from the first join
                    Price = orderBook.Price,
                    UserId = orderBook.UserId,
                    UserName = user.FullName
                })
              .Where(x => x.UserId == _user.Id)
              .ToListAsync();
            return result;
        }

    }
}