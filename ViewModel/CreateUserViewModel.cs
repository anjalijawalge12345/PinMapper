using Microsoft.AspNetCore.Mvc.Rendering;
using PinMapper.Web.Models;
using System.ComponentModel.DataAnnotations;

namespace PinMapper.Web.ViewModel
{
    public class CreateUserViewModel
    {
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        public string Contact { get; set; } // Optional, no [Required]

        [Required(ErrorMessage = "SectorId is required.")]
        public int SectorId { get; set; }

        [Required(ErrorMessage = "SubSectorId is required.")]
        public List<int> SubSectorIds { get; set; }

        [Required(ErrorMessage = "RoleId is required.")]
        public int RoleId { get; set; }

    }
}
