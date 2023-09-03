document.addEventListener('DOMContentLoaded', () => {
  const fetchCompaniesButton = document.getElementById('fetch-companies');
  const companyTableBody = document.querySelector('#company-table tbody');
  
  fetchCompaniesButton.addEventListener('click', () => {
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZGJkMzhkMC1jYjQyLTRiOTQtMGQxYS0wOGRiYWJhNWZmY2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hcy5ob25laW5pQGxhdS5lZHUiLCJqdGkiOiIxYjg3ZDVkMS0zZWY1LTRhMDctYTQ4Ny0yMjVjZmQ2ZWZlN2MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkYmQzOGQwLWNiNDItNGI5NC0wZDFhLTA4ZGJhYmE1ZmZjZiIsImV4cCI6MTY5NjI2MDQ2NCwiaXNzIjoiQW5hcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzAzMiJ9.y5FR7jGfJJdPheO3vKT5VyF73KCoAIF5GH82NV6XsqY';
      
      fetch('https://localhost:7014/api/company', {
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          companyTableBody.innerHTML = '';
          
          data.forEach(company => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${company.companyId}</td>
                  <td>${company.name}</td>
                  <td>${company.companyDescription}</td>
                  <td>${company.emailAddress}</td>
                  <td>${company.logo}</td>
                  <td>${company.active}</td>
              `;
              companyTableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
