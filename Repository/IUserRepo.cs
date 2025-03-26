using PinMapper.Web.Dto;
using PinMapper.Web.Models;
using PinMapper.Web.ViewModel;

namespace PinMapper.Web.Repository
{
    public interface IUserRepo
    {
        Task<List<UserViewModel>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task<User> CreateUser(User user);
        Task<User> UpdateUser(User user);
        Task<bool> DeleteUser(int id);
        Task<List<Sector>> GetSectors();
        Task<List<SubSectorViewModel>> GetSubSectors(int sectorId);
        Task<List<Role>> GetRoles();

        Task<List<SubSectorViewModel>> GetSubSectorsBySectorName(string sectorName);
        Task<User> GetUserByEmail(string email);
        Task<object> GetSectorsWithSubSectors();

    }
}
