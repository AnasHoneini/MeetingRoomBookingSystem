document.getElementById("update-reservation-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE';  

    // Get form values
    const reservationId = document.getElementById("reservation-id").value;
    const reservationName = document.getElementById("reservation-name").value;
    const reservationDate = document.getElementById("reservation-date").value;
    const reservationStartTime = document.getElementById("reservation-start-time").value;
    const reservationEndTime = document.getElementById("reservation-end-time").value;
    const reservationAttendees = document.getElementById("reservation-attendees").value;
    const reservationStatus = document.getElementById("reservation-status").value;
    const reservationRoomId = document.getElementById("reservation-room-id").value;
    const reservationEmployeeId = document.getElementById("reservation-employee-id").value;

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

    fetch(`https://localhost:7014/api/Reservation/${reservationId}`, {
        method: "PUT",
        body: JSON.stringify(reservationData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Handle the response from the server
        if (data) {
            alert("Reservation updated successfully!");
            // You can redirect to the reservation list or perform other actions here
        } else {
            alert("Failed to update reservation. Please try again.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the reservation.");
    });
});
