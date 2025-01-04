using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace azkindle.api.DTO
{
    public class BookDTO
    {
        public int Id { get; set; }

        public string BookName { get; set; } = null!;

        public int Stock { get; set; }

        public string Author { get; set; } = null!;

        public decimal Price { get; set; }
        // New property for storing the image as binary data
        public IFormFile Image { get; set; }
        public string ImageBase64 { get; set; }   

    }
}
