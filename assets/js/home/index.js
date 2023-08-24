import {
    init
} from "../index.js";
import "https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js";
import emailJs from "../services/email-js/index.js";
import Form from "../form/index.js";

// Initialize the image slider on the homepage.
const initSlider = () => {
    new Splide(".home-case-studies-slider", {
        type: "fade",
        rewind: true,
        autoplay: true,
    }).mount();
};

// Create and initialize a contact form using the EmailJS service.
const createContactForm = () => {
    const form = new Form("contact-form", emailJs.subscribe);
    form.init();
};

window.onload = () => {
    // Initialize the application.
    init();

    // Initialize the application.
    // initSlider();

    // Create and initialize the contact form.
    createContactForm();
};