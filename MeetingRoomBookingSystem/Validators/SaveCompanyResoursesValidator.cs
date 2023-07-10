using FluentValidation;
using MeetingRoomBookingSystem.Resourses;

namespace MeetingRoomBookingSystem.Validator
{
    public class SaveCompanyResoursesValidator : AbstractValidator<SaveCompanyResourses>
    {
        public SaveCompanyResoursesValidator()
        {
            RuleFor(a => a.Name)
                .NotEmpty()
                .MaximumLength(50);
        }
    }
    
}
