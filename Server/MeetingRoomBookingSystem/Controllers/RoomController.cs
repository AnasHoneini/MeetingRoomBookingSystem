using AutoMapper;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Resourses;
using MeetingRoomBookingSystem.Services.Interfaces;
using MeetingRoomBookingSystem.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Authorize]
    public class RoomController : ControllerBase

    {
        private readonly IRoomService _roomService;
        private readonly IMapper _mapper;

        public RoomController(IRoomService roomService, IMapper mapper)
        {
            this._mapper = mapper;
            this._roomService = roomService;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<RoomResourses>>> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRooms();
            var roomResources = _mapper.Map<IEnumerable<Room>, IEnumerable<RoomResourses>>(rooms);
            return Ok(roomResources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomResourses>> GetRoomById(int id)
        {
            var rooms = await _roomService.GetRoomById(id);
            var roomResources = _mapper.Map<Room, RoomResourses>(rooms);

            return Ok(roomResources);
        }

        [HttpPost("")]
        public async Task<ActionResult<RoomResourses>> CreateRoom([FromBody] SaveRoomResourses saveRoomResourses)
        {
            var validator = new SaveRoomResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveRoomResourses);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            int roomId = 1;
            bool isExistingId = true;
            while (isExistingId)
            {
                var existingRoom = await _roomService.GetRoomById(roomId);
                if (existingRoom == null)
                {
                    isExistingId = false;
                }
                else
                {
                    roomId++;
                }
            }

            var roomToCreate = _mapper.Map<SaveRoomResourses, Room>(saveRoomResourses);
            roomToCreate.RoomId = roomId;

            var newRoom = await _roomService.CreateRoom(roomToCreate);
            var room = await _roomService.GetRoomById(newRoom.RoomId);
            var roomResource = _mapper.Map<Room, RoomResourses>(room);

            return Ok(roomResource);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<RoomResourses>> UpdateRoom(int id, [FromBody] SaveRoomResourses saveRoomResourses)
        {
            var validator = new SaveRoomResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveRoomResourses);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var roomToBeUpdate = await _roomService.GetRoomById(id);

            if (roomToBeUpdate == null)
                return NotFound();

            var room = _mapper.Map<SaveRoomResourses, Room>(saveRoomResourses);

            await _roomService.UpdateRoom(roomToBeUpdate, room);

            var updatedRoom = await _roomService.GetRoomById(id);
            var updatedRoomResource = _mapper.Map<Room, RoomResourses>(updatedRoom);

            return Ok(updatedRoomResource);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            if (id == 0)
                return BadRequest();

            var room = await _roomService.GetRoomById(id);

            if (room == null)
                return NotFound();

            await _roomService.DeleteRoom(room);

            return NoContent();
        }

    }

}
