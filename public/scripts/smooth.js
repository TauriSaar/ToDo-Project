// smooth.js
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const links = document.querySelectorAll("a");
    let transitioning = false;

    function handleTransitionEnd() {
        transitioning = false;
        body.classList.remove("page-transition");
    }

    // Listen for the end of the CSS transition
    body.addEventListener("transitionend", handleTransitionEnd);

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (!transitioning) {
                event.preventDefault();
                const target = this.getAttribute("href");
                transitioning = true;

                // Add a class to trigger the transition
                body.classList.add("page-transition");

                // Wait for the transition to complete before navigating
                setTimeout(function () {
                    window.location.href = target;
                }, 500); // Adjust the delay as needed
            }
        });
    });

    // Perform a smooth transition when the page loads
    body.style.opacity = 0;
    setTimeout(function () {
        body.style.transition = "opacity 0.4s ease-in-out";
        body.style.opacity = 1;
    }, 0); // Delay the transition start to avoid flickering
});
