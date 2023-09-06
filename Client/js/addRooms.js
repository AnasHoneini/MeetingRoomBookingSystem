document.addEventListener('DOMContentLoaded', () => {
    const roomForm = document.getElementById('update-room-form');

    roomForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE'; 

        const roomName = document.getElementById("room-name").value;
        const roomLocation = document.getElementById("room-location").value;
        const roomCapacity = document.getElementById("room-capacity").value;
        const roomDescription = document.getElementById("room-description").value;
        const roomCompanyId = document.getElementById("room-company-id").value;

        // Create a JSON object with the form data
        const roomData = {
            name: roomName,
            location: roomLocation,
            capacity: roomCapacity,
            roomDescription: roomDescription,
            companyId: roomCompanyId,
        };


        console.log(roomData)
        try {
            const response = await fetch('https://localhost:7014/api/Room', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roomData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Clear input values after successful creation
            roomForm.reset();

            // Show a popup message
            alert('Room created successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
