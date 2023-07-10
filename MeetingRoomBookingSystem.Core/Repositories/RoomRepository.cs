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
   
    public class RoomRepository : Repository<Room>, IRoomRepository
    {
        public RoomRepository(RoomBookingSystemContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Room>> GetAllRoomsAsync()
        {
            return await MyDbContext.Rooms
                .ToListAsync();
        }

        public Task<Room> GetRoomByIdAsync(int id)
        {
            return MyDbContext.Rooms
                .SingleOrDefaultAsync(a => a.RoomId == id);
        }

        private RoomBookingSystemContext? MyDbContext
        {
            get { return Context as RoomBookingSystemContext; }
        }
    }
}
