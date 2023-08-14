using MeetingRoomBookingSystem.Core.Interfaces;
using MeetingRoomBookingSystem.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Core.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RoomBookingSystemContext _context;
        private CompanyRepository _companyRepository;
        private EmployeeRepository _employeeRepository;
        private RoomRepository _roomRepository;
        private ReservationRepository _reservationRepository;


        public UnitOfWork(RoomBookingSystemContext context)
        {
            this._context = context;
        }

        public ICompanyRepository Companies => _companyRepository = _companyRepository ?? new CompanyRepository(_context);
        public IRoomRepository Rooms => _roomRepository = _roomRepository ?? new RoomRepository(_context);
        public IEmployeeRepository Employees => _employeeRepository = _employeeRepository ?? new EmployeeRepository(_context);
        public IReservationRepository Reservations => _reservationRepository = _reservationRepository ?? new ReservationRepository(_context);

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
