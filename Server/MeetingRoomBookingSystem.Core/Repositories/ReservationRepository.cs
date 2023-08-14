using MeetingRoomBookingSystem.Core.Interfaces;
using MeetingRoomBookingSystem.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Core.Repositories
{
  
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        public ReservationRepository(RoomBookingSystemContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Reservation>> GetAllReservationsAsync()
        {
            return await MyDbContext.Reservations
                .ToListAsync();
        }

        public Task<Reservation> GetReservationByIdAsync(int id)
        {
            return MyDbContext.Reservations
                .SingleOrDefaultAsync(a => a.ReservationId == id);
        }

        private RoomBookingSystemContext? MyDbContext
        {
            get { return Context as RoomBookingSystemContext; }
        }
    }
}
