using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace azkindle.api.DTO
{
    public class ResultDTO<T>
    {
        public T Content { get; set; }

    }
}
