using System.Diagnostics;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using PinMapper.Web.Models;
using PinMapper.Web.ViewModels;

namespace PinMapper.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public HomeController(ILogger<HomeController> logger, HttpClient httpClient, IConfiguration configuration)
    {
        _logger = logger;
        _httpClient = httpClient;
        _configuration = configuration;
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
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
