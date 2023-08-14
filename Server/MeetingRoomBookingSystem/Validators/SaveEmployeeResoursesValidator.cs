using FluentValidation;
using MeetingRoomBookingSystem.Resourses;

namespace MeetingRoomBookingSystem.Validator
{
    public class SaveEmployeeResoursesValidator : AbstractValidator<SaveEmployeeResourses>
    {
        public SaveEmployeeResoursesValidator()
        {
            RuleFor(m => m.Name)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(m => m.CompanyId)
                .NotEmpty()
                .WithMessage("'Company Id' must not be 0.");
        }
    }
}
