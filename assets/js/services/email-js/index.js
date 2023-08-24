// Import emailjs library from CDN
import "https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js";

// EmailJS service and template IDs

const SERVICE_ID = "service_q0h7v7g";
const SUBSCRIBE_TEMPLATE_ID = "template_bduwfnq";
const USER_ID = "user_sKErxAWlcEHbUzgAWFTWL";
const APLLY_TEMPLATE_ID = "template_ckrs4vn";

// Initialize EmailJS with the user ID

emailjs.init(USER_ID);

// Function to send a subscription form using EmailJS

const subscribe = (form) => {
    try {
        return emailjs.sendForm(SERVICE_ID, SUBSCRIBE_TEMPLATE_ID, form);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Function to send an application form using EmailJS

const apply = (form) => {
    try {
        return emailjs.sendForm(SERVICE_ID, APLLY_TEMPLATE_ID, form);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Export the subscribe and apply functions for use in other modules

export default {
    subscribe,
    apply,
};