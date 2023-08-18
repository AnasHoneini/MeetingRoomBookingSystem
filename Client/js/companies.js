document.addEventListener('DOMContentLoaded', () => {
  const fetchCompaniesButton = document.getElementById('fetch-companies');
  const companyTableBody = document.querySelector('#company-table tbody');
  
  fetchCompaniesButton.addEventListener('click', () => {
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhOTFlYzU2MC0xZDUwLTQ3NzEtMjdjNC0wOGRiOTgyMzE0YjYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5hc0Bob25laW5pLmNvbSIsImp0aSI6ImVmNWNiNTcyLTY3YjEtNDhlYi05NzcwLWY5YTVlNmNlZmQzMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYTkxZWM1NjAtMWQ1MC00NzcxLTI3YzQtMDhkYjk4MjMxNGI2IiwiZXhwIjoxNjk0OTYxNzk2LCJpc3MiOiJBbmFzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo3MDMyIn0.hilr98PlBd_tfDwOpwRt6OKEXZAan6UYaNjgZgLuLxQ';
      
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
              `;
              companyTableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
