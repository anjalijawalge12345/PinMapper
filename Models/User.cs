using System;
using System.Collections.Generic;

namespace PinMapper.Web.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? ContactNumber { get; set; }

    public int RoleId { get; set; }

    public int SectorHierarchyId { get; set; }

    public bool Status { get; set; }

    public DateTime CreatedDt { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime UpdatedDt { get; set; }

    public string UpdatedBy { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;

    public virtual SectorHierarchy SectorHierarchy { get; set; } = null!;

    public virtual ICollection<UserSubSectorMapping> UserSubSectorMappings { get; set; } = new List<UserSubSectorMapping>();
}
