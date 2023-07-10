using MeetingRoomBookingSystem.Core.Interfaces;
using MeetingRoomBookingSystem.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Core.Repositories
{
    
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        public CompanyRepository(RoomBookingSystemContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
            return await MyDbContext.Companies
                .ToListAsync();
        }

        public Task<Company> GetCompanyByIdAsync(int id)
        {
            return MyDbContext.Companies
                .SingleOrDefaultAsync(a => a.CompanyId == id);
        }

        private RoomBookingSystemContext? MyDbContext
        {
            get { return Context as RoomBookingSystemContext; }
        }
    }
}
