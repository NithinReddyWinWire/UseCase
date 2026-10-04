using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using WinReview.Db;
using WinReview.Services;
using WinReview.Repository;
using WinReview.Services.JwtServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WinReview.Middleware;
using Microsoft.Identity.Web;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();

builder.Services.AddControllers();

builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;

    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});
   
// sql
builder.Services.AddDbContext<AppDbContext>(options=> options.
UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Authentication with microsoft
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

//For role based authorization 

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
    {
        policy.RequireClaim("roles", "Admin");
    });
});


builder.Services.AddScoped<IFeedbackServices,FeedbackService>();
builder.Services.AddScoped<JwtServices>();
builder.Services.AddScoped<IUserServices,UserServices>();
builder.Services.AddScoped<IFeedbackRepository,FeedbackRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IProjectRepository,ProjectRepository>();
builder.Services.AddScoped<IProjectServices,ProjectServices>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    //Swagger
    app.UseSwaggerUI(options =>{

    options.SwaggerEndpoint("/openapi/v1.json", "My API v1");    
    
    });
    
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();