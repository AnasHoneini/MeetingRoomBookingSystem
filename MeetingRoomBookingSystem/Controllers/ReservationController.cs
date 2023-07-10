using AutoMapper;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Resourses;
using MeetingRoomBookingSystem.Services.Interfaces;
using MeetingRoomBookingSystem.Validators;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase

    {
        private readonly IReservationService _reservationService;
        private readonly IMapper _mapper;

        public ReservationController(IReservationService reservationService, IMapper mapper)
        {
            this._mapper = mapper;
            this._reservationService = reservationService;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<ReservationResourses>>> GetAllReservations()
        {
            var reservations = await _reservationService.GetAllReservations();
            var reservationResources = _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationResourses>>(reservations);
            return Ok(reservationResources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationResourses>> GetReservationById(int id)
        {
            var reservations = await _reservationService.GetReservationById(id);
            var reservationResources = _mapper.Map<Reservation, ReservationResourses>(reservations);

            return Ok(reservationResources);
        }

        [HttpPost("")]
        public async Task<ActionResult<ReservationResourses>> CreateReservation([FromBody] SaveReservationResourses saveReservationResourses)
        {
            var validator = new SaveReservationResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveReservationResourses);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            int reservationId = 1;
            bool isExistingId = true;
            while (isExistingId)
            {
                var existingReservation = await _reservationService.GetReservationById(reservationId);
                if (existingReservation == null)
                {
                    isExistingId = false;
                }
                else
                {
                    reservationId++;
                }
            }

            var reservationToCreate = _mapper.Map<SaveReservationResourses, Reservation>(saveReservationResourses);
            reservationToCreate.ReservationId = reservationId;

            var newReservation = await _reservationService.CreateReservation(reservationToCreate);
            var reservation = await _reservationService.GetReservationById(newReservation.ReservationId);
            var reservationResource = _mapper.Map<Reservation, ReservationResourses>(reservation);

            return Ok(reservationResource);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ReservationResourses>> UpdateReservation(int id, [FromBody] SaveReservationResourses saveReservationResourses)
        {
            var validator = new SaveReservationResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveReservationResourses);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var reservationToBeUpdate = await _reservationService.GetReservationById(id);

            if (reservationToBeUpdate == null)
                return NotFound();

            var reservation = _mapper.Map<SaveReservationResourses, Reservation>(saveReservationResourses);

            await _reservationService.UpdateReservation(reservationToBeUpdate, reservation);

            var updatedReservation = await _reservationService.GetReservationById(id);
            var updatedReservationResource = _mapper.Map<Reservation, ReservationResourses>(updatedReservation);

            return Ok(updatedReservationResource);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (id == 0)
                return BadRequest();

            var reservation = await _reservationService.GetReservationById(id);

            if (reservation == null)
                return NotFound();

            await _reservationService.DeleteReservation(reservation);

            return NoContent();
        }

    }

}
