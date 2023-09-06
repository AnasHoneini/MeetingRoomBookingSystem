document.addEventListener('DOMContentLoaded', () => {
    const companyForm = document.getElementById('company-form');

    companyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiI4OWRmOTU5My02NGYxLTQxMjAtYmQ0Mi0wMjU0ZjE4YjQ3MzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjM1NTcyNCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.acyfuFZOFMiIpuHH7xiWwNXuZDZo2N3Ope0D5D4yVxE'; 

        
        const companyName = document.getElementById("company-name").value;
        const companyDescription = document.getElementById("company-description").value;
        const companyEmail = document.getElementById("company-email").value;
        const companyLogo = document.getElementById("company-logo").files[0].name;
        const companyActive = document.getElementById("company-active").checked;

        // Create a JSON object with the form data
        const companyData = {
            name: companyName,
            companyDescription: companyDescription,
            emailAddress: companyEmail,
            logo: companyLogo,
            active: companyActive ? "true" : "false",
        };

        try {
            const response = await fetch('https://localhost:7014/api/company', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Clear input values after successful creation
            companyForm.reset();

            // Show a popup message
            alert('Company created successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
