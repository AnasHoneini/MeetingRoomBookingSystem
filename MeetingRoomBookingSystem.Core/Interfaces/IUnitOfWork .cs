using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICompanyRepository Companies { get; }
        IRoomRepository Rooms { get; }
        IEmployeeRepository Employees { get; }
        IReservationRepository Reservations { get; }

        Task<int> CommitAsync();
    }
}
