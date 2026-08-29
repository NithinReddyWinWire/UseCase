using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using UseCase.Db;
using UseCase.Services;
using UseCase.Repository;
using Microsoft.AspNetCore.Connections;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});

builder.Services.AddScoped<IFeedbackServices,FeedbackService>();

builder.Services.AddScoped<IFeedbackRepository,FeedbackRepository>();

builder.Services.AddDbContext<AppDbContext>(options=> options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "My API v1");
});
    app.MapScalarApiReference(options =>
    {
        options.Theme = ScalarTheme.Moon;
    });
}

app.MapControllers();

app.Run();