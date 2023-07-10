using MeetingRoomBookingSystem.Core.Interfaces;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Services.Interfaces;

namespace MeetingEmployeeBookingSystem.Services
{

    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public EmployeeService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Employee> CreateEmployee(Employee newEmployee)
        {
            await _unitOfWork.Employees.AddAsync(newEmployee);
            await _unitOfWork.CommitAsync();
            return newEmployee;
        }

        public async Task DeleteEmployee(Employee employee)
        {
            _unitOfWork.Employees.Remove(employee);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            return await _unitOfWork.Employees
                .GetAllEmployeesAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _unitOfWork.Employees
                .GetEmployeeByIdAsync(id);
        }

        public async Task UpdateEmployee(Employee employeeToBeUpdated, Employee employee)
        {
            employeeToBeUpdated.Name = employee.Name;
            employeeToBeUpdated.DateOfBirth = employee.DateOfBirth;
            employeeToBeUpdated.Gender = employee.Gender;
            employeeToBeUpdated.Email = employee.Email;
            employeeToBeUpdated.Role = employee.Role;
            employeeToBeUpdated.Password = employee.Password;
            employeeToBeUpdated.CompanyId = employee.CompanyId;



            await _unitOfWork.CommitAsync();
        }


    }
}
