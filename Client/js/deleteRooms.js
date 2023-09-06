document.addEventListener('DOMContentLoaded', () => {
    const deleteRoomForm = document.getElementById('delete-room-form');

    deleteRoomForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE';
        const roomId = document.getElementById('room-id').value;

        if (!roomId) {
            alert('Please enter a valid room ID.');
            return;
        }

        if (!confirm('Are you sure you want to delete this room?')) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7014/api/Room/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response.status === 404) {
                // Room ID not found
                alert('Room ID not found.');
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                // Clear the form after successful deletion
                deleteRoomForm.reset();
            
                alert('Room deleted successfully!');
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
