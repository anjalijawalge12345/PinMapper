using PinMapper.Web.Models;
using PinMapper.Web.ViewModel;

namespace PinMapper.Web.Mappers
{
    public static class UserMapper
    {
        public static User ToUserEntity(this CreateUserViewModel model)
        {
            var userId = Guid.NewGuid(); // Generate new User ID here to use in mappings

            var user = new User
            {
                Id = userId,
                Email = model.Email,
                Name = model.Name,
                ContactNumber = model.Contact ?? string.Empty,
                SectorHierarchyId = model.SectorId,
                RoleId = model.RoleId,
                Status = true,
                CreatedDt = DateTime.UtcNow,
                CreatedBy = "F1C08C0B-860D-4F40-A416-539907617FA6",
                UpdatedDt = DateTime.UtcNow,
                UpdatedBy = "F1C08C0B-860D-4F40-A416-539907617FA6",
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
