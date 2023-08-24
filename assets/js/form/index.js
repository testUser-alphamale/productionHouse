// Importing helper functions and validation utilities
import {
    addEvent,
    getElement,
    getElementAttribute,
    getElements,
} from "../heplers.js";
import {
    validateEmail,
    validatePhone,
    validateUrl
} from "./utils.js";

class Form {
    formName;
    submitFunc;
    constructor(name, func) {
        this.formName = name;
        this.submitFunc = func;
    }
// Returns an array of all input elements within the form
    getInputs() {
        return getElements(`form.${this.formName} .input`);
    }
// Adds focus and blur events to all input elements
    addEventToInputs() {
        const inputs = this.getInputs();
        inputs.forEach((input) => {
            // Bind the 'this' keyword to the current form instance when calling event handlers
            addEvent(input, "focus", this.handleFocus.bind(this, input));
            addEvent(input, "blur", this.handleBlur.bind(this, input));
        });
        // Add events to file upload input (if it exists)
        this.addEventsToUploadInput();
    }
// Adds click and change events to the file upload input and its associated elements
    addEventsToUploadInput() {
        const uploadTrigger = getElement(
            `form.${this.formName} .upload-container-trigger`
        );
        if (!uploadTrigger) return;// Return if no file upload input found
        const uploadInput = getElement(`form.${this.formName} .upload`);
        // Click event to trigger file upload dialog when upload container clicked
        uploadTrigger.addEventListener("click", () => {
            uploadInput.click();
        });
        // Change event to handle file selection and display file name
        uploadInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            let name;
            if (file) {
                name = file.name;
            }
            this.handleFileUploaded(name, uploadTrigger);
        });
// Clear button to reset file upload input and hide file name container
        const clearBtn = getElement(
            `form.${this.formName} .upload-container-file-clear`
        );
        addEvent(clearBtn, "click", () => {
            this.handleFileUploaded("", uploadTrigger);
        });
    }
// Handles display of selected file name in file upload container
    handleFileUploaded(name, uploadBtn) {
        const input = getElement(`form.${this.formName} .upload`);
        this.handleFocus(input);
        const nameContainer = getElement(
            `form.${this.formName} .upload-container-file-name`
        );
        const text = nameContainer.querySelector(
            ".upload-container-file-name-text"
        );
        if (!name) {
            input.value = "";
            uploadBtn.style.display = "flex";
            text.innerText = " ";
            nameContainer.style.display = "none";
        } else {
            uploadBtn.style.display = "none";
            text.innerText = name;
            nameContainer.style.display = "flex";
        }
    }
// Handles input blur event, validates input and displays error message if invalid
    handleBlur(input) {
        const isValid = this.validateInput(input);
        if (!isValid) {
            this.showError(input);
        }
    }
// Handles input focus event, hides error message
    handleFocus(input) {
        this.hideError(input);
    }
// Validates input value based on 'data-required' and 'data-validation' attributes
    validateInput(input) {
        const isRequired = JSON.parse(getElementAttribute(input, "data-required"));
        const validation = getElementAttribute(input, "data-validation");
        const value = input.value;
        // Check validation based on data-validation attribute
        switch (validation) {
            case "email":
                return validateEmail(value, isRequired);
            case "phone":
                return validatePhone(value, isRequired);
            case "url":
                return validateUrl(value, isRequired);
            default:
                return isRequired ? !!value : true;
        }
    }

    handleInputValues() {
        const errors = [];
        const inputs = this.getInputs();
        // Validate each input and show error if invalid
        inputs.forEach((input) => {
            const isValid = this.validateInput(input);
            if (!isValid) {
                this.showError(input);
                errors.push(true);
            }
        });
// Return true if there are no errors
        return errors.length === 0;
    }

    showError(input) {
        const name = getElementAttribute(input, "name");
        const error = getElement(`.${this.formName} .${name}-error`);
        // Add class to show error message
        error.classList.add("input-error-active");
    }

    hideError(input) {
        const name = getElementAttribute(input, "name");
        const error = getElement(`.${this.formName} .${name}-error`);
        // Remove class to hide error message
        error.classList.remove("input-error-active");
    }

    addSubmitEventToForm() {
        const form = getElement(`.${this.formName}`);
        // Add submit event listener to form
        form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
// Validate all inputs and handle loading
        const isValid = this.handleInputValues();
        if (isValid) {
            this.handleLoading(true);
// Call submit function and handle loading and submitted state
            await this.submitFunc(e.target);
            this.handleLoading(false);
            this.handleSubmitted();
        }
    }

    handleLoading(show) {
        const loader = getElement(`form.${this.formName} .loader`);
        const submitBtn = getElement(`form.${this.formName} .submit`);
         // Show or hide loading spinner and submit button
        if (show) {
            loader.style.display = "block";
            submitBtn.style.display = "none";
        } else {
            loader.style.display = "none";
            submitBtn.style.display = "block";
        }
    }

    handleSubmitted() {
        const inputs = this.getInputs();
        // Reset all input values
        inputs.forEach((input) => {
            input.value = "";
        });

        const uploadTrigger = getElement(
            `form.${this.formName} .upload-container-trigger`
        );

        const submitBtn = getElement(`form.${this.formName} .submit`);
        submitBtn.style.display = "none";
        const successText = getElement(`form.${this.formName} .success`);
        successText.classList.add("success-active");
        if (!uploadTrigger) return;
        this.handleFileUploaded("", uploadTrigger);
    }

    init() {
        this.addEventToInputs();
        this.addSubmitEventToForm();
    }
}

export default Form;