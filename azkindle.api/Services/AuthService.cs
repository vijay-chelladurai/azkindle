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

namespace azkindle.api.Services
{
    public class AuthService : IAuthService
    {
        private readonly AzkindleDbContext _context;
        private readonly IConfiguration _config;
        private readonly ICurrentUser _user;
        public AuthService(AzkindleDbContext context, IConfiguration config, ICurrentUser currentUser)
        {
            _context = context;
            _config = config;
            _user = currentUser;
        }
        public async Task<ResultDTO<string>> Login(LoginDTO req)
        {
            ResultDTO<string> res = new();
            var user = await _context.TblUsers.Where((x) => x.EmailAddress == req.EmailAddress && x.Password == req.Password).FirstOrDefaultAsync();

            if (user is null)
                throw new UnauthorizedAccessException();

            res.Content = CreateToken(user.Id, user.FullName, user.Role);

            return res;
        }
        public async Task<ResultDTO<string>> Register(UserDTO request)
        {
            ResultDTO<string> res = new();
            if (await _context.TblUsers.AnyAsync((x) => x.EmailAddress == request.EmailAddress.ToLower()))
            {
                throw new ArgumentException("User Already Exists");
            }

            TblUser user = new TblUser();
            user.FullName = request.FullName;
            user.EmailAddress = request.EmailAddress;
            user.Password = request.Password;
            user.Role = request.Role;
            user.Comments = request.Comments;

            await _context.TblUsers.AddAsync(user);
            await _context.SaveChangesAsync();
            res.Content = "User registered successfully";
            return res;
        }
        private string CreateToken(long UserId, string FullName, string role)
        {
            var authClaims = new List<Claim>
                        {
                            new Claim("userId", UserId.ToString()),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim("role",role),
                            new Claim("fullName", FullName),
                        };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));

            int.TryParse(_config["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );


            int.TryParse(_config["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
