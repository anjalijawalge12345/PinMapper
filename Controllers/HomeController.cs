using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PinMapper.Web.Models;

namespace PinMapper.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
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

    public IActionResult Dashboard()
    {
         ViewData["ActivePage"] = "Dashboard";
    return View();
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
