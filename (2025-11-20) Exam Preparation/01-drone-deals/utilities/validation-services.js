import { showNotification } from "../views/show-notification.js";

function validateRegisterFormInput (email, password, repeatPassword) {
    let errorMessage;

    email = email.trim();

    if (!email || !password || !repeatPassword) {
        errorMessage = 'All fields are required';
    } else if (password !== repeatPassword) {
        errorMessage = 'Passwords don\'t match';
    }

    if (errorMessage) showNotification(errorMessage);
    return !errorMessage;
}

function validateLoginFormInput (email, password) {
    let errorMessage;

    email = email.trim();

    if (!email || !password) {
        errorMessage = 'All fields are required';
    }

    if (errorMessage) showNotification(errorMessage);
    return !errorMessage;
}

function validateSellFormInput (model, imageUrl, price, weight, phone, condition, description) {
    let errorMessage;

    if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
        errorMessage = 'All fields are required';
    } else if (Number.isNaN(Number(price)) || Number(price) < 0) {
        errorMessage = 'The price is not valid';
    } else if (Number.isNaN(Number(weight)) || Number(weight) <= 0) {
        errorMessage = 'The weight is not valid';
    }

    if (errorMessage) showNotification(errorMessage);
    return !errorMessage;
}

function validateEditFormInput (model, imageUrl, price, weight, phone, condition, description) {
    return validateSellFormInput(
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    );
}

export const validationServices = {
    validateRegisterFormInput,
    validateLoginFormInput,
    validateSellFormInput,
    validateEditFormInput
};