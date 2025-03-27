using Microsoft.AspNetCore.Mvc;
using PinMapper.Web.Repository;
using PinMapper.Web.ViewModel;
using PinMapper.Web.Mappers;
using PinMapper.Web.Models;

namespace PinMapper.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepo _userRepo;

        public UserController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<IActionResult> Index()
        {

            var users = await _userRepo.GetAllUsers();
            return View(users);
        }

        [HttpGet]
        public async Task<IActionResult> GetSector()
        {
            var sectors = await _userRepo.GetSectors();
            return Ok(sectors);

        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _userRepo.GetRoles();
            return Ok(roles);

        }

        [HttpGet]
        public async Task<IActionResult> GetSubSectors(int sectorId)
        {
            var subSectors = await _userRepo.GetSubSectors(sectorId);
            return Ok(subSectors);
        }

        [HttpPost]

        public async Task<IActionResult> CreateUser(CreateUserViewModel userData) // Receive as form parameters
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userRepo.GetUserByEmail(userData.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Email already exists." });
            }

            var user = userData.ToUserEntity(); 

            await _userRepo.CreateUser(user);

            TempData["SuccessMessage"] = "User created successfully!";
            return RedirectToAction("Index", "User");
        }

        [HttpGet]
        public async Task<IActionResult> GetSectorsWithSubSectors()
        {
            var SectorsWithSubSectors = await _userRepo.GetSectorsWithSubSectors();
            return Ok(SectorsWithSubSectors);
        }


        [HttpGet]
        public async Task<IActionResult> GetSubSectorsBySectorName(string sectorName)
        {
            var subSectors = await _userRepo.GetSubSectorsBySectorName(sectorName);
            return Ok(subSectors);
        }
    }
}
