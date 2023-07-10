using FluentValidation;
using MeetingRoomBookingSystem.Resourses;

namespace MeetingRoomBookingSystem.Validators
{
    public class SaveRoomResoursesValidator : AbstractValidator<SaveRoomResourses>
    {
        public SaveRoomResoursesValidator()
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
