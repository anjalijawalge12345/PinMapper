namespace PinMapper.Web.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? ContactNumber { get; set; }
        public int RoleId { get; set; }
        public SectorDto? Sector { get; set; }
        public List<SubSectorDto> SubSectors { get; set; } = new();
    }
}
