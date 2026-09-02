using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using WinReview.Db;
using WinReview.Services;
using WinReview.Repository;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});
   
// sql
builder.Services.AddDbContext<AppDbContext>(options=> options.
UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<IFeedbackServices,FeedbackService>();
builder.Services.AddScoped<IUserServices,UserServices>();
builder.Services.AddScoped<IFeedbackRepository,FeedbackRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    //Swagger
    app.UseSwaggerUI(options =>{
    options.SwaggerEndpoint("/openapi/v1.json", "My API v1");});
    
    //Scalar
    app.MapScalarApiReference(options =>{
        options.Theme = ScalarTheme.Mars;
    });
}

app.MapControllers();

app.Run();