﻿using MeetingRoomBookingSystem.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Core.Interfaces
{
    

    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
    }
}
