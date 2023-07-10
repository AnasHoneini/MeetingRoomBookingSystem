using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MeetingRoomBookingSystem.Core.Models;

public partial class RoomBookingSystemContext : DbContext
{
    public RoomBookingSystemContext()
    {
    }

    public RoomBookingSystemContext(DbContextOptions<RoomBookingSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=RoomBookingSystem;Trusted_Connection=True;Encrypt=False;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("PK__Company__AD54599045C5CAD3");

            entity.ToTable("Company");

            entity.Property(e => e.CompanyId)
                .ValueGeneratedNever()
                .HasColumnName("companyId");
            entity.Property(e => e.Active)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("active");
            entity.Property(e => e.CompanyDescription)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("companyDescription");
            entity.Property(e => e.EmailAddress)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("emailAddress");
            entity.Property(e => e.Logo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("logo");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__C134C9C1EEC2FF7C");

            entity.ToTable("Employee");

            entity.Property(e => e.EmployeeId)
                .ValueGeneratedNever()
                .HasColumnName("employeeId");
            entity.Property(e => e.CompanyId).HasColumnName("companyId");
            entity.Property(e => e.DateOfBirth)
                .HasColumnType("date")
                .HasColumnName("dateOfBirth");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("role");

            entity.HasOne(d => d.Company).WithMany(p => p.Employees)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__Employee__compan__4BAC3F29");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.ReservationId).HasName("PK__Reservat__B14BF5C57D3F860E");

            entity.ToTable("Reservation");

            entity.Property(e => e.ReservationId)
                .ValueGeneratedNever()
                .HasColumnName("reservationId");
            entity.Property(e => e.DateOfMeeting)
                .HasColumnType("datetime")
                .HasColumnName("dateOfMeeting");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.EmployeeId).HasColumnName("employeeId");
            entity.Property(e => e.EndTime).HasColumnType("datetime").HasColumnName("endTime");
            entity.Property(e => e.MeetingStatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("meetingStatus");
            entity.Property(e => e.NumberOfAttendees).HasColumnName("numberOfAttendees");
            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.StartTime).HasColumnType("datetime").HasColumnName("startTime");

            entity.HasOne(d => d.Employee).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__Reservati__emplo__52593CB8");

            entity.HasOne(d => d.Room).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("FK__Reservati__roomI__5165187F");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Room__6C3BF5BE39E3D5D6");

            entity.ToTable("Room");

            entity.Property(e => e.RoomId)
                .ValueGeneratedNever()
                .HasColumnName("roomId");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CompanyId).HasColumnName("companyId");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("location");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.RoomDescription)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("roomDescription");

            entity.HasOne(d => d.Company).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__Room__companyId__4E88ABD4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
