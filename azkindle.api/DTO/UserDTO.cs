using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace azkindle.api.DTO
{
    public class UserDTO
    {
        public string FullName { get; set; }
        public string Role { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Comments { get; set; }
    }
}
