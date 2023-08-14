using AutoMapper;
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
    public class CompanyController : ControllerBase

    {
        private readonly ICompanyService _companyService;
        private readonly IMapper _mapper;

        public CompanyController(ICompanyService companyService, IMapper mapper)
        {
            this._mapper = mapper;
            this._companyService = companyService;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<CompanyResourses>>> GetAlCompanies()
        {
            var companies = await _companyService.GetAllCompanies();
            var companyResources = _mapper.Map<IEnumerable<Company>, IEnumerable<CompanyResourses>>(companies);
            return Ok(companyResources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyResourses>> GetCompanyById(int id)
        {
            var companies = await _companyService.GetCompanyById(id);
            var companyResources = _mapper.Map<Company, CompanyResourses>(companies);

            return Ok(companyResources);
        }

        [HttpPost("")]
        public async Task<ActionResult<CompanyResourses>> CreateCompany([FromBody] SaveCompanyResourses saveCompanyResourses)
        {
            var validator = new SaveCompanyResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveCompanyResourses);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            int companyId = 1;
            bool isExistingId = true;
            while (isExistingId)
            {
                var existingCompany = await _companyService.GetCompanyById(companyId);
                if (existingCompany == null)
                {
                    isExistingId = false;
                }
                else
                {
                    companyId++;
                }
            }

            var companyToCreate = _mapper.Map<SaveCompanyResourses, Company>(saveCompanyResourses);
            companyToCreate.CompanyId = companyId;

            var newCompany = await _companyService.CreateCompany(companyToCreate);
            var company = await _companyService.GetCompanyById(newCompany.CompanyId);
            var companyResource = _mapper.Map<Company, CompanyResourses>(company);

            return Ok(companyResource);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<CompanyResourses>> UpdateCompany(int id, [FromBody] SaveCompanyResourses saveCompanyResource)
        {
            var validator = new SaveCompanyResoursesValidator();
            var validationResult = await validator.ValidateAsync(saveCompanyResource);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var companyToBeUpdate = await _companyService.GetCompanyById(id);

            if (companyToBeUpdate == null)
                return NotFound();

            var company = _mapper.Map<SaveCompanyResourses, Company>(saveCompanyResource);

            await _companyService.UpdateCompany(companyToBeUpdate, company);

            var updatedCompany = await _companyService.GetCompanyById(id);
            var updatedCompanyResource = _mapper.Map<Company, CompanyResourses>(updatedCompany);

            return Ok(updatedCompanyResource);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (id == 0)
                return BadRequest();

            var company = await _companyService.GetCompanyById(id);

            if (company == null)
                return NotFound();

            await _companyService.DeleteCompany(company);

            return NoContent();
        }

    }

}
