﻿using System.ComponentModel.DataAnnotations;

namespace azkindle.api.DTO
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        [Required]

        public string Password { get; set; }
    }
}
