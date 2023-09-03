document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the user's first name from localStorage
    const firstName = localStorage.getItem("firstName");
  console.log(firstName);
    // Check if the first name is available
    if (firstName) {
      // Display a welcome message with the user's first name
      const welcomeMessage = document.getElementById("welcome-message");
      welcomeMessage.textContent = `Welcome ${firstName}`;
    }
  });
  