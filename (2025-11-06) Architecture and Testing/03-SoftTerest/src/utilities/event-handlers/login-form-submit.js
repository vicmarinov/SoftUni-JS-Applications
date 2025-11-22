import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";
import { validationServices } from "../validation-services.js";

export async function onLoginFormSubmit (event) {
    event.preventDefault();

    const loginFormElement = event.currentTarget;
    const { email, password } = Object.fromEntries(
        new FormData(loginFormElement).entries()
    );

    const areInputValuesValid = validationServices
        .validateLoginFormInput(email, password);
    if (!areInputValuesValid) return;

    await userServices.loginUser(email, password);

    showView(new URL(window.location.origin + '/'));
}