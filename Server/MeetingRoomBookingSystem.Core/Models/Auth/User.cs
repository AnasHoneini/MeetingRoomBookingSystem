﻿using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingRoomBookingSystem.Core.Models.Auth
{
    public class User : IdentityUser<Guid>
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }
    }
}
