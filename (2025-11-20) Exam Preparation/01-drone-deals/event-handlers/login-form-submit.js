import page from '../node_modules/page/page.mjs';
import { userServices } from '../utilities/user-services.js';
import { validationServices } from '../utilities/validation-services.js';

export async function onLoginFormSubmit (event) {
    event.preventDefault();

    const loginForm = event.currentTarget;

    const {
        email,
        password
    } = Object.fromEntries(new FormData(loginForm).entries());

    const areInputValuesValid = validationServices
        .validateLoginFormInput(email, password);

    if (!areInputValuesValid) return;

    loginForm.disabled = true;
    await userServices.loginUser(email, password);

    loginForm.disabled = false;
    page.redirect('/');
}