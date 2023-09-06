document.getElementById("update-employee-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE'; 

    // Get form values
    const employeeId = document.getElementById("employee-id").value;
    const employeeName = document.getElementById("employee-name").value;
    const employeeDateOfBirth = document.getElementById("employee-date-of-birth").value;
    const employeeGender = document.getElementById("employee-gender").value;
    const employeeEmail = document.getElementById("employee-email").value;
    const employeeRole = document.getElementById("employee-role").value;
    const employeeCompanyId = document.getElementById("employee-company-id").value;
    console.log(employeeDateOfBirth);

    // Create a JSON object with the form data
    const employeeData = {
        name: employeeName,
        dateOfBirth: employeeDateOfBirth,
        gender: employeeGender,
        email: employeeEmail,
        role: employeeRole,
        companyId: employeeCompanyId,
    };

    fetch(`https://localhost:7014/api/Employee/${employeeId}`, {
        method: "PUT",
        body: JSON.stringify(employeeData),
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
            alert("Employee updated successfully!");
            // You can redirect to the employee list or perform other actions here
        } else {
            alert("Failed to update employee. Please try again.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the employee.");
    });
});
