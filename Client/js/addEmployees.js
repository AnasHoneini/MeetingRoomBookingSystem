document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('update-employee-form');

    employeeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiIxYjg3ZDVkMS0zZWY1LTRhMDctYTQ4Ny0yMjVjZmQ2ZWZlN2MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjI2MDQ2NCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.y5FR7jGfJJdPheO3vKT5VyF73KCoAIF5GH82NV6XsqY'; 

        const employeeName = document.getElementById("employee-name").value;
        const employeeDateOfBirth = document.getElementById("employee-date-of-birth").value;
        const employeeGender = document.getElementById("employee-gender").value;
        const employeeEmail = document.getElementById("employee-email").value;
        const employeeRole = document.getElementById("employee-role").value;
        const employeeCompanyId = document.getElementById("employee-company-id").value;

        // Create a JSON object with the form data
        const employeeData = {
            name: employeeName,
            dateOfBirth: employeeDateOfBirth,
            gender: employeeGender,
            email: employeeEmail,
            role: employeeRole,
            companyId: employeeCompanyId,
        };


        console.log(employeeData)
        try {
            const response = await fetch('https://localhost:7014/api/employee', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Clear input values after successful creation
            employeeForm.reset();

            // Show a popup message
            alert('Employee created successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
