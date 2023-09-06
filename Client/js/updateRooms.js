document.getElementById("update-room-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE'; 

    // Get form values
    const roomId = document.getElementById("room-id").value;
    const roomName = document.getElementById("room-name").value;
    const roomLocation = document.getElementById("room-location").value;
    const roomCapacity = document.getElementById("room-capacity").value;
    const roomDescription = document.getElementById("room-description").value;
    const roomCompanyId = document.getElementById("room-company-id").value;
    console.log(roomLocation);

    // Create a JSON object with the form data
    const roomData = {
        name: roomName,
        location: roomLocation,
        capacity: roomCapacity,
        roomDescription: roomDescription,
        companyId: roomCompanyId,
    };

    fetch(`https://localhost:7014/api/Room/${roomId}`, {
        method: "PUT",
        body: JSON.stringify(roomData),
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
            alert("Room updated successfully!");
            // You can redirect to the room list or perform other actions here
        } else {
            alert("Failed to update room. Please try again.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the room.");
    });
});
