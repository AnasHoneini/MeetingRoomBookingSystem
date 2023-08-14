using MeetingRoomBookingSystem.Core.Interfaces;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Services
{
   
    public class ReservationService : IReservationService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReservationService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Reservation> CreateReservation(Reservation newReservation)
        {
            await _unitOfWork.Reservations.AddAsync(newReservation);
            await _unitOfWork.CommitAsync();
            return newReservation;
        }

        public async Task DeleteReservation(Reservation reservation)
        {
            _unitOfWork.Reservations.Remove(reservation);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<Reservation>> GetAllReservations()
        {
            return await _unitOfWork.Reservations
                .GetAllReservationsAsync();
        }

        public async Task<Reservation> GetReservationById(int id)
        {
            return await _unitOfWork.Reservations
                .GetReservationByIdAsync(id);
        }

        public async Task UpdateReservation(Reservation reservationToBeUpdated, Reservation reservation)
        {
            reservationToBeUpdated.DateOfMeeting = reservation.DateOfMeeting;
            reservationToBeUpdated.Name = reservation.Name;
            reservationToBeUpdated.StartTime = reservation.StartTime;
            reservationToBeUpdated.EndTime = reservation.EndTime;
            reservationToBeUpdated.NumberOfAttendees = reservation.NumberOfAttendees;
            reservationToBeUpdated.MeetingStatus = reservation.MeetingStatus;
            reservationToBeUpdated.RoomId = reservation.RoomId;
            reservationToBeUpdated.EmployeeId = reservation.EmployeeId;

            await _unitOfWork.CommitAsync();
        }


    }
}
