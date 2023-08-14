using AutoMapper;
using MeetingEmployeeBookingSystem.Services;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Resourses;
using MeetingRoomBookingSystem.Services.Interfaces;
using MeetingRoomBookingSystem.Validator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Authorize]
    public class EmployeeController : ControllerBase

    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            this._mapper = mapper;
            this._employeeService = employeeService;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<EmployeeResourses>>> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployees();
            var employeeResources = _mapper.Map<IEnumerable<Employee>, IEnumerable<EmployeeResourses>>(employees);
            return Ok(employeeResources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeResourses>> GetEmployeeById(int id)
        {
            var employees = await _employeeService.GetEmployeeById(id);
            var employeeResources = _mapper.Map<Employee, EmployeeResourses>(employees);

            return Ok(employeeResources);
        }

        [HttpPost("")]
        public async Task<ActionResult<EmployeeResourses>> CreateEmployee([FromBody] SaveEmployeeResourses saveEmployeeResourses)
        {
            var validator = new SaveEmployeeResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveEmployeeResourses);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            int employeeId = 1;
            bool isExistingId = true;
            while (isExistingId)
            {
                var existingEmployee = await _employeeService.GetEmployeeById(employeeId);
                if (existingEmployee == null)
                {
                    isExistingId = false;
                }
                else
                {
                    employeeId++;
                }
            }

            var employeeToCreate = _mapper.Map<SaveEmployeeResourses, Employee>(saveEmployeeResourses);
            employeeToCreate.EmployeeId = employeeId;

            var newEmployee = await _employeeService.CreateEmployee(employeeToCreate);
            var employee = await _employeeService.GetEmployeeById(newEmployee.EmployeeId);
            var employeeResource = _mapper.Map<Employee, EmployeeResourses>(employee);

            return Ok(employeeResource);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<EmployeeResourses>> UpdateEmployee(int id, [FromBody] SaveEmployeeResourses saveEmployeeResourses)
        {
            var validator = new SaveEmployeeResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveEmployeeResourses);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var employeeToBeUpdate = await _employeeService.GetEmployeeById(id);

            if (employeeToBeUpdate == null)
                return NotFound();

            var employee = _mapper.Map<SaveEmployeeResourses, Employee>(saveEmployeeResourses);

            await _employeeService.UpdateEmployee(employeeToBeUpdate, employee);

            var updatedEmployee = await _employeeService.GetEmployeeById(id);
            var updatedEmployeeResource = _mapper.Map<Employee, EmployeeResourses>(updatedEmployee);

            return Ok(updatedEmployeeResource);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (id == 0)
                return BadRequest();

            var employee = await _employeeService.GetEmployeeById(id);

            if (employee == null)
                return NotFound();

            await _employeeService.DeleteEmployee(employee);

            return NoContent();
        }

    }

}
