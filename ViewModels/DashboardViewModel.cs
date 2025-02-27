namespace PinMapper.Web.ViewModels;

public class DashboardViewModel
{
    public int Countries { get; set; }
    public int States { get; set; }
    public int Districts { get; set; }
    public int Tehsils { get; set; }
    public int Pins { get; set; }
    public List<PincodeLocation> PincodeLocations { get; set; }
}

public class PincodeLocation
{
    public string Pincode { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Information { get; set; }
}