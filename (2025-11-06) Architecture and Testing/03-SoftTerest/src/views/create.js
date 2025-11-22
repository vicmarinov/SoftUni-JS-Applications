import { showView } from "../utilities/show-view.js";
import { userServices } from "../utilities/user-services.js";
import { onCreateFormSubmit } from "../utilities/event-handlers/create-form-submit.js";

const createViewElement = document.querySelector('body > div[data-view-name="create"]');

export function showCreateView () {
    if (!userServices.getUserData.id()) {
        alert('Please log in or register create new ideas.')
        showView(new URL(window.location.origin + '/'));
    }
    
    document.body.appendChild(createViewElement);

    const createFormElement = createViewElement.querySelector('form');
    createFormElement.addEventListener('submit', onCreateFormSubmit);
    createFormElement.reset();
}