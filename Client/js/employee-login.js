document.addEventListener("DOMContentLoaded", function () {
    // Get the login form
    const loginForm = document.querySelector(".main_form");
  
    // Add a submit event listener to the form
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the email and password values from the form inputs
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
  
      // Make a GET request to the API to check user credentials
      fetch(`https://localhost:7014/api/Employee?email=${email}&password=${password}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            // If the response status is not OK, handle the error
            throw new Error("Authentication failed");
          }
          return response.json(); // Parse the response as JSON
        })
        .then((employeeData) => {
          // Find the employee with matching email and password
          const matchingEmployee = employeeData.find((employee) => {
            return employee.email === email && employee.password === password;
          });
  
          if (matchingEmployee) {
            // User email and password match, redirect to the dashboard
            window.location.href = "companies.html"; // Replace with the actual URL
          } else {
            // Credentials are incorrect
            handleAuthenticationError();
          }
        })
        .catch(() => {
          // Handle authentication error
          handleAuthenticationError();
        });
    });
  
    function handleAuthenticationError() {
      // Display an error message to the user
      const errorElement = document.querySelector(".user-entry-error");
      errorElement.textContent = "Invalid email or password";
      errorElement.classList.remove("hide");
    }
  });
  