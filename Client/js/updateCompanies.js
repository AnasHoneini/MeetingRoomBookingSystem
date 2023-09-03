// Update a company based on its ID
document
  .getElementById('update-company-form')
  .addEventListener('submit', function (e) {
    e.preventDefault()
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiIxYjg3ZDVkMS0zZWY1LTRhMDctYTQ4Ny0yMjVjZmQ2ZWZlN2MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjI2MDQ2NCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.y5FR7jGfJJdPheO3vKT5VyF73KCoAIF5GH82NV6XsqY'
    // Get form values
    const companyId = document.getElementById('company-id').value
    const companyName = document.getElementById('company-name').value
    const companyDescription = document.getElementById('company-description')
      .value
    const companyEmail = document.getElementById('company-email').value
    const companyLogo = document.getElementById('company-logo').files[0].name
    const companyActive = document.getElementById('company-active').checked

    // Create a JSON object with the form data
    const companyData = {
      name: companyName,
      companyDescription: companyDescription,
      emailAddress: companyEmail,
      logo: companyLogo, // You may need to upload and handle the logo separately on the server
      active: companyActive ? 'true' : 'false',
    }

    // Send an AJAX request to update the company
    fetch(`https://localhost:7014/api/Company/${companyId}`, {
      method: 'PUT',
      body: JSON.stringify(companyData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // Handle the response from the server
        if (data) {
          alert('Company updated successfully!')
          // You can redirect to the company list or perform other actions here
        } else {
          console.log('ok')
          alert('Failed to update company. Please try again.')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        alert('An error occurred while updating the company.')
      })
  })
