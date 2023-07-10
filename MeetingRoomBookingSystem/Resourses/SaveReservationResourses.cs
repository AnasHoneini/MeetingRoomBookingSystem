namespace MeetingRoomBookingSystem.Resourses
{
    public class SaveReservationResourses
    {
        public DateTime? DateOfMeeting { get; set; }

        public string? Name { get; set; }


        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int? NumberOfAttendees { get; set; }

        public string? MeetingStatus { get; set; }

        public int? RoomId { get; set; }

        public int? EmployeeId { get; set; }
    }
}
