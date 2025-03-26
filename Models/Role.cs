using System;
using System.Collections.Generic;

namespace PinMapper.Web.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool Status { get; set; }

    public DateTime CreatedDt { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime UpdatedDt { get; set; }

    public string UpdatedBy { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
