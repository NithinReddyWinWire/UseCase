using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using WinReview.Db;
using WinReview.Services;
using WinReview.Repository;
using WinReview.Services.JwtServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;

    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});
   
// sql
builder.Services.AddDbContext<AppDbContext>(options=> options.
UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


//authenticatoin with jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]!
                )
            ),

            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization();


builder.Services.AddScoped<IFeedbackServices,FeedbackService>();
builder.Services.AddScoped<JwtServices>();
builder.Services.AddScoped<IUserServices,UserServices>();
builder.Services.AddScoped<IFeedbackRepository,FeedbackRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    //Swagger
    app.UseSwaggerUI(options =>{

    options.SwaggerEndpoint("/openapi/v1.json", "My API v1");    
    
    });
    
    //Scalar
    app.MapScalarApiReference(options =>{
        options.Theme = ScalarTheme.Mars;
    });
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();