using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using PinMapper.Web.Configurations;
using PinMapper.Web.Data;
using PinMapper.Web.Repository;


//using PinMapper.Web.Repository;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Home/Index";           // Redirect here if not authenticated
        options.LogoutPath = "/Account/Logout";         // Path to logout
        options.AccessDeniedPath = "/Account/AccessDenied"; // Redirect here if not authorized
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);  // Cookie timeout
        options.SlidingExpiration = true;                    // Extend cookie on each request
    });
    
builder.Services.AddHttpClient();
builder.Services.AddScoped<IUserRepo, UserRepo>();

builder.Services.Configure<JwtApiSettings>(
    builder.Configuration.GetSection("JwtApiSettings"));

builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));


//Add DbContext

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
