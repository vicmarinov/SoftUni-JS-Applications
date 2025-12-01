import page from '../node_modules/page/page.mjs';
import { userServices } from '../utilities/user-services.js';
import { validationServices } from '../utilities/validation-services.js';

export async function onRegisterFormSubmit (event) {
    event.preventDefault();

    const registerForm = event.currentTarget;

    const {
        email,
        password,
        rePass
    } = Object.fromEntries(new FormData(registerForm).entries());

    const areInputValuesValid = validationServices
        .validateRegisterFormInput(email, password, rePass);

    if (!areInputValuesValid) return;

    registerForm.disabled = true;
    await userServices.registerUser(email, password);

    registerForm.disabled = false;
    page.redirect('/dashboard');
}