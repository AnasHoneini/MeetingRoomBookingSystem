using System;
using System.Collections.Generic;

namespace MeetingRoomBookingSystem.Core.Models;

public partial class Room
{
    public int RoomId { get; set; }

    public string? Name { get; set; }

    public string? Location { get; set; }

    public int? Capacity { get; set; }

    public string? RoomDescription { get; set; }

    public int? CompanyId { get; set; }

    public virtual Company? Company { get; set; }

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
