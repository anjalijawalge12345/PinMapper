using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using PinMapper.Web.Configurations;
using PinMapper.Web.ViewModel;
using PinMapper.Web.ViewModels;
using static System.Net.WebRequestMethods;

namespace PinMapper.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly JwtApiSettings _jwtSettings;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly SmtpSettings _smtpSettings;
    public HomeController(ILogger<HomeController> logger, HttpClient httpClient, IConfiguration configuration, IOptions<JwtApiSettings> jwtOptions,
        IOptions<SmtpSettings> smtpOptions, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClient;
        _configuration = configuration;
        _jwtSettings = jwtOptions.Value;
        _httpClientFactory = httpClientFactory;
        _smtpSettings = smtpOptions.Value;
    }

    //private async Task<bool> SendOtpEmailAsync(string recipientEmail, string otp)
    //{
    //    try
    //    {
    //        var fromAddress = new MailAddress(_smtpSettings.SenderEmail, "KBL Admin");
    //        var toAddress = new MailAddress(recipientEmail);

    //        var message = new MailMessage(fromAddress, toAddress)
    //        {
    //            Subject = "Your OTP for Login",
    //            IsBodyHtml = true
    //        };

    //        var sb = new StringBuilder();
    //        sb.AppendLine("Dear User,<br/><br/>");
    //        sb.AppendLine($"Your OTP is: <strong>{otp}</strong><br/><br/>");
    //        sb.AppendLine("Regards,<br/>KBL Team");

    //        message.Body = sb.ToString();

    //        using var smtp = new SmtpClient
    //        {
    //            Host = _smtpSettings.Host,
    //            Port = _smtpSettings.Port,
    //            EnableSsl = _smtpSettings.EnableSsl,
    //            UseDefaultCredentials = _smtpSettings.UseDefaultCredentials
    //        };

    //        try
    //        {
    //            await smtp.SendMailAsync(message);
    //        }
    //        catch (Exception ex)
    //        {
    //            Console.WriteLine( ex.Message);
    //            throw;
    //        }
    //        return true;
    //    }
    //    catch (Exception ex)
    //    {
    //        // Log error if needed
    //        Console.WriteLine("Email sending failed: " + ex.Message);
    //        return false;
    //    }
    //}

    private async Task SendOtpEmailAsync(string email, string otp)
    {
        var smtpClient = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
        {
            Credentials = new NetworkCredential(_smtpSettings.UserName, _smtpSettings.Password),
            EnableSsl = _smtpSettings.EnableSsl
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_smtpSettings.SenderEmail),
            Subject = "Your OTP Code",
            Body = $"Your OTP code is: {otp}",
            IsBodyHtml = false,
        };
        mailMessage.To.Add(email);

        await smtpClient.SendMailAsync(mailMessage);
    }

    private async static Task<string> GenerateAlphanumericOTP(int length = 6)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new Random();
        var otp = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            otp.Append(chars[random.Next(chars.Length)]);
        }

        return otp.ToString();
    }


    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        ViewData["ActivePage"] = "Privacy";
        return View();
    }

    private async Task<string?> GetJwtTokenAsync()
    {
        var requestBody = new
        {
            clientId = _jwtSettings.ClientId,
            clientSecret = _jwtSettings.ClientSecret
        };

        var client = _httpClientFactory.CreateClient();
        var apiUrl = "https://testwebapi.kirloskarpumps.com/Microservices/APIGateway/gateway/tokenVali";

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        var response = await client.PostAsync(apiUrl, content);

        if (!response.IsSuccessStatusCode)
        {
            // Log the error if needed
            return null;
        }
        
        try
        {
            var token = await response.Content.ReadAsStringAsync();
            return token;
        }
        catch (Exception ex)
        {

            throw;
        }
       
    }

    private async Task<IActionResult> AuthenticateUser(string email, string password)
    {
        var jwtToken = await GetJwtTokenAsync();
        if (string.IsNullOrEmpty(jwtToken))
            return Unauthorized("Token fetch failed");

        var client = _httpClientFactory.CreateClient();

        var requestBody = new
        {
            strLoginId = "16310",
            strPassword = "eMK3NB4JcMxjPgeKs5QrKw==" // encrypted password
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://testwebapi.kirloskarpumps.com/Microservices/APIGateway/gateway/Auth")
        {
            Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
        };

        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", jwtToken.Replace("\"", "")); // remove quotes

        var response = await client.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            var otp = await GenerateAlphanumericOTP();

            await SendOtpEmailAsync("anjalijawalge123@gmail.com", otp);


            return Ok();
        }
        //var responseContent = await response.Content.ReadAsStringAsync();
        return Ok();
    }

    public async Task<IActionResult> Dashboard()
    {
         ViewData["ActivePage"] = "Dashboard";

        var pincodeInfo = new Dictionary<string, string>
                    {
                        { "110001", "Connaught Place, New Delhi" },
                        { "400001", "Fort, Mumbai" },
                        { "560001", "MG Road, Bangalore" }
                    };


        var locations = new List<PincodeLocation>();

        foreach (var pincode in pincodeInfo)
        {
            var (lat, lon) = await GetCoordinatesAsync(pincode.Key);
            if (lat != 0 && lon != 0)
            {
                locations.Add(new PincodeLocation { Pincode = pincode.Key, Latitude = lat, Longitude = lon, Information = pincodeInfo[pincode.Key] });
            }
        }
        ViewBag.GoogleMapsApiKey = _configuration["GoogleMaps:ApiKey"];

        var model = new DashboardViewModel()
        {
            Countries = 10,
            States = 280,
            Districts = 400,
            Tehsils = 200,
            Pins = 19100,
            PincodeLocations = locations,
        };

        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest login)
    {
        return await AuthenticateUser(login.Email, login.Password);
    }

    private async Task<(double, double)> GetCoordinatesAsync(string pincode)
    {
        var apiKey = _configuration["OpenCage:ApiKey"];
        string url = $"https://api.opencagedata.com/geocode/v1/json?q={pincode},India&key={apiKey}";

        var response = await _httpClient.GetStringAsync(url);
        var json = JObject.Parse(response);

        var results = json["results"]?.FirstOrDefault();
        if (results != null)
        {
            double lat = (double)results["geometry"]["lat"];
            double lon = (double)results["geometry"]["lng"];
            return (lat, lon);
        }

        return (0, 0);
    }
    public IActionResult PincodeList()
    {
           ViewData["ActivePage"] = "PincodeList";
    return View();
    }
    public IActionResult NotificationEmail()
    {
         ViewData["ActivePage"] = "NotificationEmail";
    return View();
    }

public IActionResult Workflow()
    {
         ViewData["ActivePage"] = "Workflow";
    return View();
    }
    public IActionResult UserManagement()
    {
         ViewData["ActivePage"] = "UserManagement";
    return View();
    }
     public IActionResult MasterData()
    {
         ViewData["ActivePage"] = "MasterData";
    return View();
    }
}
