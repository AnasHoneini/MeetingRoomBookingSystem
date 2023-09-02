document.addEventListener('DOMContentLoaded', () => {
    const companyForm = document.getElementById('company-form');

    companyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiJmY2I5OGJiZS1kZDg5LTRkOWEtYWY0OS0yZmIzYWU4Mjk1M2IiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjI0NjAzOCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.I-Qj83HOQbUY5SSmJHRve3S9FdyDtAaaTjakcwlvuos'; 

        
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
