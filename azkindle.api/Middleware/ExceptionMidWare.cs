using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Net;
using System.Runtime.Serialization;
using System.Security.Authentication;
using System.Threading.Tasks;
using System;

namespace azkindle.api.Middleware
{
    public class ExceptionMidWare
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMidWare> logger;


        public ExceptionMidWare(RequestDelegate _next, ILogger<ExceptionMidWare> _logger)
        {
            next = _next;
            logger = _logger;

        }


        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);

            }

            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message, ex.StackTrace);

                int statusCode = (int)HttpStatusCode.BadRequest;
                string msg = "";
                (statusCode, msg) = GetStatusCodeByException(ex);

                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                {
                    msg = ex.Message;
                }

                context.Response.StatusCode = statusCode;
                context.Response.ContentType = "text/html";
                await context.Response.WriteAsync(msg);

            }
        }
        private (int, string) GetStatusCodeByException(Exception ex)
        {
            int statusCode;
            string msg = "Internal Server Error.";
            switch (ex)
            {
                case ArgumentException:
                case FormatException:
                case SerializationException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    break;
                case NotImplementedException:
                case NotSupportedException:
                    statusCode = (int)HttpStatusCode.MethodNotAllowed;
                    break;
                case FileNotFoundException:
                    statusCode = (int)HttpStatusCode.NotFound;
                    break;
                case AuthenticationException:
                    statusCode = (int)HttpStatusCode.Unauthorized;
                    msg = "Unauthorized error..";
                    break;
                case UnauthorizedAccessException:
                    statusCode = (int)HttpStatusCode.Forbidden;
                    msg = "Unauthorized error..";
                    break;
                default:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            return (statusCode, msg);
        }
    }
}
