using Microsoft.AspNetCore.Mvc;
﻿using System.Net;
using System.Text.Json;

namespace WinReview.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;


    //constructor
    public ExceptionHandlingMiddleware(RequestDelegate next,ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    //HttpContext contains info about http request and responce
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred.");

            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync( HttpContext context,Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = new ErrorResponse();

                switch (exception)
                {
                    case KeyNotFoundException:

                        response.StatusCode = (int) HttpStatusCode.NotFound;
                        response.Message =exception.Message;
                        break;

                    case ArgumentException:

                        response.StatusCode = (int) HttpStatusCode.BadRequest;
                        response.Message = exception.Message;
                        break;

                    
                    default:

                        response.StatusCode = (int) HttpStatusCode.InternalServerError;
                        response.Message ="Internal Server Error";
                        break;
                }

                context.Response.StatusCode = response.StatusCode;
                var json = JsonSerializer.Serialize(response);
                await context.Response.WriteAsync(json);
            } 

    public class ErrorResponse
        {
            public int StatusCode { get; set; }

            public string Message { get; set; }
                = string.Empty;
        }
       
}

