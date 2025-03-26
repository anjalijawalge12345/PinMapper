using Microsoft.EntityFrameworkCore;
using PinMapper.Web.Data;
using PinMapper.Web.Dto;
using PinMapper.Web.Models;
using PinMapper.Web.ViewModel;

namespace PinMapper.Web.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly ApplicationDbContext _context;

        public UserRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserViewModel>> GetAllUsers()
        {
            var users = await _context.Users.Include(u => u.Role)
       .Include(u => u.SectorHierarchy)
       .Include(u => u.UserSubSectorMappings)
           .ThenInclude(m => m.SectorHierarchy)
       .ToListAsync();

            var result = users.Select(user => new UserViewModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Sector = user.SectorHierarchy.Name,
                Contact = user.ContactNumber,
                Role = user.Role.Name,

                SubSector = user.UserSubSectorMappings
                    .Where(m => m.SectorHierarchy.ParentId != null)
                    .Select(m => new SubSectorViewModel
                    {
                        Id = m.SectorHierarchy.Id,
                        Name = m.SectorHierarchy.Name
                    }).ToList()
            }).ToList();

            return result;
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Sector>> GetSectors()
        {
            return _context.SectorHierarchies
                .Where(m => m.ParentId == null)
                .Select(m => new Sector
                {
                    Id = m.Id,
                    Name = m.Name
                }).ToList();
           


        }
        public async Task<List<Role>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<List<SubSectorViewModel>> GetSubSectors(int sectorId)
        {


            return await _context.SectorHierarchies
                .Where(s => s.ParentId == sectorId)
                .OrderBy(s => s.Name)
                .Select(s => new SubSectorViewModel
                {
                    Id = s.Id,
                    Name = s.Name,
                })
                .ToListAsync();
        }

        public async Task<object> GetSectorsWithSubSectors()
        {
            var sectors = await _context.SectorHierarchies
                .Where(s => s.ParentId == null) // Load related SubSectors
                .ToListAsync();

            var result = new
            {
                selector = sectors.Select(s => s.Name).ToList(), // List of sector names
                sectorsData = sectors.ToDictionary(
                    s => s.Id  // Sector Name as Key
                    //s => s.SubSectors.Select(ss => ss.Name).ToList() // List of SubSector Names
                )
            };

            return result;
        }

        public async Task<List<SubSectorViewModel>> GetSubSectorsBySectorName(string sectorName)
        {
            // 1. Find the sector by name
            var sector = await _context.SectorHierarchies
                .FirstOrDefaultAsync(s => s.Name == sectorName);

            // 2. If not found, return empty list
            if (sector == null)
                return new List<SubSectorViewModel>();

            // 3. Query sub-sectors by that sector's Id
            return await _context.SectorHierarchies
                .Where(ss => ss.ParentId == sector.Id)
                .OrderBy(ss => ss.Name)
                .Select(ss => new SubSectorViewModel
                {
                    Id = ss.Id,
                    Name = ss.Name,
                })
                .ToListAsync();
        }

        
    }
}
