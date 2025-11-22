import { showView } from "../show-view.js";
import { ideasServices } from "../ideas-services.js";
import { validationServices } from "../validation-services.js";

export async function onCreateFormSubmit (event) {
    event.preventDefault();
    
    const createFormElement = event.currentTarget;
    const { title, description, imageURL } = Object.fromEntries(
        new FormData(createFormElement).entries()
    );

    const areInputValuesValid = validationServices
        .validateCreateFormInput(title, description, imageURL);
    if (!areInputValuesValid) return;

    await ideasServices.createIdea(title, description, imageURL);

    showView(new URL(window.location.origin + '/dashboard'));
}