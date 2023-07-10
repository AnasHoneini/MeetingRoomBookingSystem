using FluentValidation;
using MeetingRoomBookingSystem.Resourses;

namespace MeetingRoomBookingSystem.Validators
{
    public class SaveReservationResoursesValidator : AbstractValidator<SaveReservationResourses>
    {
        public SaveReservationResoursesValidator()
        {
            RuleFor(m => m.Name)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(m => m.EmployeeId)
                .NotEmpty()
                .WithMessage("'Employee Id' must not be 0.");

            RuleFor(m => m.RoomId)
                .NotEmpty()
                .WithMessage("'Room Id' must not be 0.");
        }
    }
}
