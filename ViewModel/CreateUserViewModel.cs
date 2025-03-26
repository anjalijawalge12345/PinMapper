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

    public static class UserExtensions
    {
        public static User ToUserEntity(this CreateUserViewModel model)
        {
            var userId = Guid.NewGuid(); // Generate new User ID here to use in mappings

            var user = new User
            {
                Id = userId,
                Name = model.Name,
                Email = model.Email,
                ContactNumber = model.Contact ?? string.Empty,
                SectorHierarchyId = model.SectorId,
                RoleId = model.RoleId,
                Status = true,
                CreatedDt = DateTime.UtcNow,
                CreatedBy = "system",
                UpdatedDt = DateTime.UtcNow,
                UpdatedBy = "system",
                UserSubSectorMappings = model.SubSectorIds?.Select(subSectorId => new UserSubSectorMapping
                {
                    UserId = userId,
                    SectorHierarchyId = subSectorId
                }).ToList() ?? new List<UserSubSectorMapping>()
            };

            return user;
        }
    }
}
