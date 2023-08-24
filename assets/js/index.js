// Import the navbar module
import navbar from "./navbar/index.js";

// Initialize the website
export const init = () => {
    // Handle the website scrolling
    handleOnScroll();
    // Initialize the navbar
    navbar.init();
    // Initialize the AOS library
    AOS.init({
        once: true
    });
};



// Handle website scrolling
export const handleOnScroll = (className) => {
    // Set a timeout to delay the scroll event listener being added
    setTimeout(() => {
        // Add a scroll event listener to the document
        document.addEventListener(
            "scroll",
            () => {
                // Handle the navbar background based on the scroll position
                navbar.handleScroll(className);
            }, {
                passive: true
            }
        );
    }, 1000);
};