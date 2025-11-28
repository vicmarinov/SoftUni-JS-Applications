import { validationServices } from "../utilities/validation-services.js";
import { onLoginFormSubmit } from "../utilities/event-handlers/login-form-submit.js";
import { onLinkClick } from "../utilities/event-handlers/link-click.js";

const loginViewElement = document.querySelector('body > div[data-view-name="login"]');

export function showLoginView () {
    validationServices.validateAccessToLoginView();
    
    document.body.appendChild(loginViewElement);

    const loginFormElement = loginViewElement.querySelector('form');
    loginFormElement.addEventListener('submit', onLoginFormSubmit);
    loginFormElement.reset();

    loginViewElement
        .querySelector('a[href="/register"]')
        .addEventListener('click', onLinkClick);
}