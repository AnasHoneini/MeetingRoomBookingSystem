document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function (dropdown) {
        const dropdownButton = dropdown.querySelector(".dropbtn");
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        dropdownButton.addEventListener("click", function () {
            dropdownContent.classList.toggle("show");
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener("click", function (event) {
            if (!event.target.matches(".dropbtn")) {
                const openDropdown = document.querySelector(".dropdown-content.show");
                if (openDropdown) {
                    openDropdown.classList.remove("show");
                }
            }
        });
    });
});