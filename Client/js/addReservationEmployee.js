document.addEventListener('DOMContentLoaded', () => {
    const createReservationForm = document.getElementById('create-reservation-form');

    const firstName = localStorage.getItem("firstName");
    console.log(firstName);
      // Check if the first name is available
      if (firstName) {
        // Display a welcome message with the user's first name
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.textContent = `Welcome ${firstName}`;
      }

    const signoutButton = document.getElementById('contact');

    // Add a click event listener to the signout button
    signoutButton.addEventListener('click', () => {
        // Perform the signout logic here, e.g., clear authentication token or session
        // You may use localStorage or sessionStorage to store authentication data.

        // Clear authentication data
        localStorage.removeItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE'); // Replace 'authToken' with your authentication token key
        localStorage.removeItem('firstName'); // If you stored the first name, remove it as well

        // Redirect to the homepage
        window.location.href = 'homepage.html'; // Replace 'index.html' with the actual homepage URL
    });

    createReservationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE';  

        const reservationName = document.getElementById('reservation-name').value;
        const reservationDate = document.getElementById('reservation-date').value;
        const reservationStartTime = document.getElementById('reservation-start-time').value;
        const reservationEndTime = document.getElementById('reservation-end-time').value;
        const reservationAttendees = document.getElementById('reservation-attendees').value;
        const reservationStatus = document.getElementById('reservation-status').value;
        const reservationRoomId = document.getElementById('reservation-room-id').value;
        const reservationEmployeeId = document.getElementById('reservation-employee-id').value;

        // Create a JSON object with the form data
        const reservationData = {
            Name: reservationName,
            dateOfMeeting: reservationDate,
            startTime: reservationStartTime,
            endTime: reservationEndTime,
            numberOfAttendees: reservationAttendees,
            meetingStatus: reservationStatus,
            roomId: reservationRoomId,
            employeeId: reservationEmployeeId,
        };

        try {
            const response = await fetch('https://localhost:7014/api/Reservation', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Clear input values after successful creation
            createReservationForm.reset();

            // Show a popup message
            alert('Reservation created successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
