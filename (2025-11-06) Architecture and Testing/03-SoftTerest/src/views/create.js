import { validationServices } from "../utilities/validation-services.js";
import { onCreateFormSubmit } from "../utilities/event-handlers/create-form-submit.js";

const createViewElement = document.querySelector('body > div[data-view-name="create"]');

export function showCreateView () {
    validationServices.validateAccessToCreateView();
    
    document.body.appendChild(createViewElement);

    const createFormElement = createViewElement.querySelector('form');
    createFormElement.addEventListener('submit', onCreateFormSubmit);
    createFormElement.reset();
}