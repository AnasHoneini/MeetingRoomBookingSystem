document.addEventListener('DOMContentLoaded', () => {
    const fetchReservationsButton = document.getElementById('fetch-reservations');
    const reservationsTableBody = document.querySelector('#reservation-table tbody');

    fetchReservationsButton.addEventListener('click', () => {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE';  

        fetch('https://localhost:7014/api/Reservation', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            reservationsTableBody.innerHTML = '';

            data.forEach(reservation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reservation.reservationId}</td>
                    <td>${reservation.name}</td>
                    <td>${reservation.dateOfMeeting}</td>
                    <td>${reservation.startTime}</td>
                    <td>${reservation.endTime}</td>
                    <td>${reservation.numberOfAttendees}</td>
                    <td>${reservation.meetingStatus}</td>
                    <td>${reservation.roomId}</td>
                    <td>${reservation.employeeId}</td>
                `;
                reservationsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
