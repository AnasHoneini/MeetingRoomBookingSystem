document.addEventListener('DOMContentLoaded', () => {
    const companyForm = document.getElementById('company-form');

    companyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhOTFlYzU2MC0xZDUwLTQ3NzEtMjdjNC0wOGRiOTgyMzE0YjYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hc0Bob25laW5pLmNvbSIsImp0aSI6ImVmNWNiNTcyLTY3YjEtNDhlYi05NzcwLWY5YTVlNmNlZmQzMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYTkxZWM1NjAtMWQ1MC00NzcxLTI3YzQtMDhkYjk4MjMxNGI2IiwiZXhwIjoxNjk0OTYxNzk2LCJpc3MiOiJBbmFzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo3MDMyIn0.hilr98PlBd_tfDwOpwRt6OKEXZAan6UYaNjgZgLuLxQ'; 

        
        const formData = new FormData(companyForm);
        const companyData = {};
        formData.forEach((value, key) => {
            companyData[key] = value;
        });

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
