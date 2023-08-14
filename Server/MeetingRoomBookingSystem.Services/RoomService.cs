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
    
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        public RoomService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Room> CreateRoom(Room newRoom)
        {
            await _unitOfWork.Rooms.AddAsync(newRoom);
            await _unitOfWork.CommitAsync();
            return newRoom;
        }

        public async Task DeleteRoom(Room room)
        {
            _unitOfWork.Rooms.Remove(room);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _unitOfWork.Rooms
                .GetAllRoomsAsync();
        }

        public async Task<Room> GetRoomById(int id)
        {
            return await _unitOfWork.Rooms
                .GetRoomByIdAsync(id);
        }

        public async Task UpdateRoom(Room RoomToBeUpdated, Room Room)
        {
            RoomToBeUpdated.Name = Room.Name;
            RoomToBeUpdated.Location = Room.Location;
            RoomToBeUpdated.Capacity = Room.Capacity;
            RoomToBeUpdated.RoomDescription = Room.RoomDescription;
            RoomToBeUpdated.CompanyId = Room.CompanyId;

            await _unitOfWork.CommitAsync();
        }


    }
}
