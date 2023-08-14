using System;
using System.Collections.Generic;

namespace MeetingRoomBookingSystem.Core.Models;

public partial class Reservation
{
    public int ReservationId { get; set; }

    public DateTime? DateOfMeeting { get; set; }

    public string? Name { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? NumberOfAttendees { get; set; }

    public string? MeetingStatus { get; set; }

    public int? RoomId { get; set; }

    public int? EmployeeId { get; set; }

    public virtual Employee? Employee { get; set; }

    public virtual Room? Room { get; set; }
}
