using PinMapper.Web.Models;

namespace PinMapper.Web.ViewModel
{
    public class UserViewModel
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Contact { get; set; }

        public string? Role { get; set; }

        public string? Sector { get; set; }

        public List<SubSectorViewModel> SubSector { get; set; } = new();

        public DateTime? CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}
