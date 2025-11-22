import { showView } from "../utilities/show-view.js";
import { userServices } from "../utilities/user-services.js";
import { onRegisterFormSubmit } from "../utilities/event-handlers/register-form-submit.js";
import { onLinkClick } from "../utilities/event-handlers/link-click.js";

const registerViewElement = document.querySelector('body > div[data-view-name="register"]');

export function showRegisterView () {
    if (userServices.getUserData.id()) {
        alert('Please logout before registering a new user.')
        showView(new URL(window.location.origin + '/'));
    }

    document.body.appendChild(registerViewElement);

    const registerFormElement = registerViewElement.querySelector('form');
    registerFormElement.addEventListener('submit', onRegisterFormSubmit);
    registerFormElement.reset();
    

    registerViewElement
        .querySelector('a[href="/login"]')
        .addEventListener('click', onLinkClick);
}