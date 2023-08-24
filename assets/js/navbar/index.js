// Importing helper functions
import {
    addEvent,
    getElement,
    getElements,
    toggleBodyOverflow,
} from "../heplers.js";
// Declare variables
let leaveTimeout;
let scrollPos = 0;
// Function to handle background color of navbar
const handleBackground = (className) => {
    const navbar = getElement(".navbar");

    const offsetTop = window.pageYOffset;
    if (offsetTop >= 10) {
        navbar.classList.add(className || "navbar-active");
    } else {
        navbar.classList.remove(className || "navbar-active");
    }
};

// Function to handle scroll event
const handleScroll = (className) => {
    handleBackground(className);
};
// Function to add click event to mobile toggle
const addEventToMobileToggle = () => {
    const toggle = getElement(".navbar-mobile-toggle");
    addEvent(toggle, "click", toggleMobileMenu);
};
// Function to add click event to mobile overlay
const addEventToMobileOverlay = () => {
    const overlay = getElement(".navbar-mobile-overlay");
    addEvent(overlay, "click", hideMenu);
};
// Function to add click event to mobile navigation links
const addEventToMobileNavigationLink = () => {
    const links = getElements(".navbar-navigation-link");
    links.forEach((link) => {
        addEvent(link, "click", hideMenu);
    });
};
// Function to add hover event to navbar links
const addLinkHoverEvent = () => {
    const links = getElements(".navbar-navigation-link");
    links.forEach((link) => {
        addEvent(link, "mouseenter", handleIndicator.bind(null, link));
        addEvent(link, "mouseleave", hideIndicator);
    });
};
// Function to hide the indicator element
const hideIndicator = () => {
    leaveTimeout = setTimeout(() => {
        const indicator = getElement(".navbar-navigation-indicator");
        indicator.style.opacity = 0;
    }, 500);
};
// Function to handle the indicator element
const handleIndicator = (elem) => {
    window.clearTimeout(leaveTimeout);
    const {
        left,
        width
    } = elem.getBoundingClientRect();
    const indicator = getElement(".navbar-navigation-indicator");
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
    setTimeout(() => {
        indicator.style.opacity = 1;
    }, 100);
};
// Function to hide the mobile menu
const hideMenu = () => {
    const active = "navbar-mobile-active";
    const menu = getElement(".navbar");
    toggleBodyOverflow(false);
    menu.classList.remove(active);
};
// Function to toggle the mobile menu
const toggleMobileMenu = () => {
    const active = "navbar-mobile-active";
    const menu = getElement(".navbar");
    if (menu.classList.contains(active)) {
        toggleBodyOverflow(false);
        menu.classList.remove(active);
    } else {
        toggleBodyOverflow(true);
        menu.classList.add(active);
    }
};
// Function to initialize the navbar
const init = () => {
    addEventToMobileToggle();
    handleBackground();
    addEventToMobileNavigationLink();
    addEventToMobileOverlay();
    addLinkHoverEvent();
};
// Exporting the functions as an object
export default {
    handleScroll,
    handleBackground,
    init,
};