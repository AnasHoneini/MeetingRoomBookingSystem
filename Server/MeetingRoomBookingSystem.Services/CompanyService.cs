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
    public class CompanyService : ICompanyService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CompanyService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Company> CreateCompany(Company newCompany)
        {
            await _unitOfWork.Companies.AddAsync(newCompany);
            await _unitOfWork.CommitAsync();
            return newCompany;
        }

        public async Task DeleteCompany(Company company)
        {
            _unitOfWork.Companies.Remove(company);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<Company>> GetAllCompanies()
        {
            return await _unitOfWork.Companies
                .GetAllCompaniesAsync();
        }

        public async Task<Company> GetCompanyById(int id)
        {
            return await _unitOfWork.Companies
                .GetCompanyByIdAsync(id);
        }

        public async Task UpdateCompany(Company companyToBeUpdated, Company company)
        {
            companyToBeUpdated.Name = company.Name;
            companyToBeUpdated.CompanyDescription = company.CompanyDescription;
            companyToBeUpdated.EmailAddress = company.EmailAddress;
            companyToBeUpdated.Logo = company.Logo;
            companyToBeUpdated.Active = company.Active;

            await _unitOfWork.CommitAsync();
        }


    }
}
