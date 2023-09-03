document.addEventListener('DOMContentLoaded', () => {
    const deleteEmployeeForm = document.getElementById('delete-employee-form');

    deleteEmployeeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiIxYjg3ZDVkMS0zZWY1LTRhMDctYTQ4Ny0yMjVjZmQ2ZWZlN2MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjI2MDQ2NCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.y5FR7jGfJJdPheO3vKT5VyF73KCoAIF5GH82NV6XsqY';
        const employeeId = document.getElementById('employee-id').value;

        if (!employeeId) {
            alert('Please enter a valid employee ID.');
            return;
        }

        if (!confirm('Are you sure you want to delete this employee?')) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7014/api/Employee/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response.status === 404) {
                // Employee ID not found
                alert('Employee ID not found.');
            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                // Clear the form after successful deletion
                deleteEmployeeForm.reset();
            
                alert('Employee deleted successfully!');
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
