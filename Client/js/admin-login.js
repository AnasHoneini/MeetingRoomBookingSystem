document.addEventListener("DOMContentLoaded", function () {
    // Get the login form
    const loginForm = document.querySelector(".main_form");
  
    // Add a submit event listener to the form
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the email and password values from the form inputs
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
      const firstName = extractAndCapitalizeFirstName(email)
      console.log(firstName);
      // Create an object with the user's credentials
      const credentials = {
        email: email,
        password: password,
      };
  
      //Fetch request to the API
      fetch("https://localhost:7014/api/Auth/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => {
          if (!response.ok) {
            // If the response status is not OK, handle the error
            throw new Error("Authentication failed");
          }
          localStorage.setItem('firstName', firstName);
          window.location.href = "adminDashboard.html";
        })
        .catch((error) => {
          // Handle authentication error
          console.error("Authentication failed:", error);
          // Display an error message to the user
          const errorElement = document.querySelector(".user-entry-error");
          errorElement.textContent = "Invalid email or password";
          errorElement.classList.remove("hide");
        });
    });
    function extractAndCapitalizeFirstName(email) {
      const atIndex = email.indexOf('.')
      if (atIndex !== -1) {
        // Extract the part of the email before the "@"
        const namePart = email.substring(0, atIndex)
        // Capitalize the first letter and convert the rest to lowercase
        return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase()
      }
      // Default to an empty string if "@" is not found
      return ''
    }
  });
  