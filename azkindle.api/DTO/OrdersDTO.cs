using System;
using System.ComponentModel.DataAnnotations;

namespace azkindle.api.DTO
{
    public class OredrsDTO
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public long UserId { get; set; }
        public string BookName { get; set; }
        public string UserName { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public DateTime? DateOfOrder { get; set; }
    }
}
