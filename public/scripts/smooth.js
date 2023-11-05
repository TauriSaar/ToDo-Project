// smooth.js

document.addEventListener("DOMContentLoaded", async function () {
    const body = document.body;
    const links = document.querySelectorAll("a");
    let transitioning = false;

    function handleTransitionEnd() {
        transitioning = false;
        body.classList.remove("page-transition");
    }

    // Add a class to trigger the transition for page load
    function startPageTransition() {
        body.style.transition = "opacity 0.4s ease-in-out";
        body.style.opacity = 1;
    }

    // Handle link clicks
    async function handleLinkClick(event) {
        event.preventDefault();

        if (!transitioning) {
            transitioning = true;

            const target = this.getAttribute("href");

            // Add a class to trigger the transition
            body.classList.add("page-transition");

            // Wait for the transition to complete before navigating
            await new Promise(resolve => {
                setTimeout(resolve, 400); // Adjust the delay as needed
            });

            window.location.href = target;
        }
    }

    // Listen for the end of the CSS transition
    body.addEventListener("transitionend", handleTransitionEnd);

    // Attach click event listeners to links
    links.forEach(function (link) {
        link.addEventListener("click", handleLinkClick);
    });

    // Perform a smooth transition when the page loads
    startPageTransition();
});
