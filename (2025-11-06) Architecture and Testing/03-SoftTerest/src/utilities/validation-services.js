import { showView } from "./show-view.js";
import { userServices } from "./user-services.js";

function validateRegisterFormInput (email, password, repeatPassword) {
    let errorMessage;

    if (!email || !password || !repeatPassword) {
        errorMessage = 'Some required fields are blank! Please fill all of them to register.';
    } else if (email.length < 3) {
        errorMessage = 'The email must be at least 3 characters long! Please check that the email you have entered is correct.';
    } else if (password.length < 3) {
        errorMessage = 'The password must be at least 3 characters long! Try using a stronger one, please.';
    } else if (password !== repeatPassword) {
        errorMessage = 'The passwords do not match! Please make sure both fields contain the same password.';
    }

    if (errorMessage) alert(errorMessage);
    return !errorMessage;
}

function validateLoginFormInput (email, password) {
    let errorMessage;

    if (!email || !password) {
        errorMessage = 'Some required fields are blank! Please fill all of them to log in.';
    }

    if (errorMessage) alert(errorMessage);
    return !errorMessage;
}

function validateCreateFormInput (title, description, imageURL) {
    let errorMessage;

    if (!title || !description || !imageURL) {
        errorMessage = 'Some required fields are blank! Please fill all of them to create a new idea.';
    } else if (title.length < 6) {
        errorMessage = 'The title must be at least 6 characters long! Please make sure it is descriptive enough.';
    } else if (description.length < 10) {
        errorMessage = 'The description must be at least 10 characters long! Please provide a more detailed description.';
    } else if (imageURL.length < 5) {
        errorMessage = 'The image URL must be at least 5 characters long! Please ensure the URL is correct and valid.';
    }

    if (errorMessage) alert(errorMessage);
    return !errorMessage;
}

function validateAccessToView (hasToBeAuthenticated, errorMessage) {
    if (
        hasToBeAuthenticated
        ? !userServices.getUserData.id()
        : userServices.getUserData.id()
    ) {
        alert(errorMessage);
        showView(new URL(window.location.origin + '/'));
    }
}

function validateAccessToRegisterView () {
    validateAccessToView(false, 'Please log out before registering a new user.');
}

function validateAccessToLoginView () {
    validateAccessToView(false, 'Please log out before logging in again.');
}

function validateAccessToCreateView () {
    validateAccessToView(true, 'Please log in or register create new ideas.');
}

export const validationServices = {
    validateRegisterFormInput,
    validateLoginFormInput,
    validateCreateFormInput,
    validateAccessToRegisterView,
    validateAccessToLoginView,
    validateAccessToCreateView
};