using MeetingRoomBookingSystem.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Services.Interfaces
{
   
    public interface IReservationService
    {
        Task<IEnumerable<Reservation>> GetAllReservations();
        Task<Reservation> GetReservationById(int id);
        Task<Reservation> CreateReservation(Reservation newReservation);
        Task UpdateReservation(Reservation reservationToBeUpdated, Reservation reservation);
        Task DeleteReservation(Reservation reservation);

    }

}
