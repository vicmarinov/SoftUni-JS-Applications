import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";
import { validationServices } from "../validation-services.js";

export async function onRegisterFormSubmit (event) {
    event.preventDefault();

    const registerFormElement = event.currentTarget;
    const { email, password, repeatPassword } = Object.fromEntries(
        new FormData(registerFormElement).entries()
    );

    const areInputValuesValid = validationServices
        .validateRegisterFormInput(email, password, repeatPassword);
    if (!areInputValuesValid) return;

    await userServices.registerUser(email, password);

    showView(new URL(window.location.origin + '/'));
}