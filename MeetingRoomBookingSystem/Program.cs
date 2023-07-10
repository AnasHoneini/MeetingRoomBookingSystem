using AutoMapper;
using MeetingEmployeeBookingSystem.Services;
using MeetingRoomBookingSystem.Core.Interfaces;
using MeetingRoomBookingSystem.Core.Models;
using MeetingRoomBookingSystem.Core.Repositories;
using MeetingRoomBookingSystem.Services;
using MeetingRoomBookingSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<RoomBookingSystemContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyDatabase")));

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
