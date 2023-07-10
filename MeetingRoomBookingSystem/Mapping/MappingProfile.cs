using AutoMapper;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Resourses;

namespace MeetingRoomBookingSystem.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to Resource
            CreateMap<Company, CompanyResourses>();
            CreateMap<Employee, EmployeeResourses>();
            CreateMap<Room, RoomResourses>();
            CreateMap<Reservation, ReservationResourses>();
 



            // Resource to Domain
            CreateMap<CompanyResourses, Company>();
            CreateMap<EmployeeResourses, Employee>();
            CreateMap<RoomResourses, Room>();
            CreateMap<ReservationResourses, Reservation>();

            CreateMap<SaveCompanyResourses, Company>();
            CreateMap<SaveEmployeeResourses, Employee>();
            CreateMap<SaveRoomResourses, Room>();
            CreateMap<SaveReservationResourses, Reservation>();



        }
    }
}
