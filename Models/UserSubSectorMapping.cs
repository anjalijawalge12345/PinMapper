using System;
using System.Collections.Generic;

namespace PinMapper.Web.Models;

public partial class UserSubSectorMapping
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int SectorHierarchyId { get; set; }

    public virtual SectorHierarchy SectorHierarchy { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
