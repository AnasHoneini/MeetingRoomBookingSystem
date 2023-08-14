using System;
using System.Collections.Generic;

namespace MeetingRoomBookingSystem.Core.Models;

public partial class Company
{
    public int CompanyId { get; set; }

    public string? Name { get; set; }

    public string? CompanyDescription { get; set; }

    public string? EmailAddress { get; set; }

    public string? Logo { get; set; }

    public string? Active { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
