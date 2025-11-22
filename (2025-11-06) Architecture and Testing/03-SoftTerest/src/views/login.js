import { showView } from "../utilities/show-view.js";
import { userServices } from "../utilities/user-services.js";
import { onLoginFormSubmit } from "../utilities/event-handlers/login-form-submit.js";
import { onLinkClick } from "../utilities/event-handlers/link-click.js";

const loginViewElement = document.querySelector('body > div[data-view-name="login"]');

export function showLoginView () {
    if (userServices.getUserData.id()) {
        alert('Please log out before logging in again.')
        showView(new URL(window.location.origin + '/'));
    }
    
    document.body.appendChild(loginViewElement);

    const loginFormElement = loginViewElement.querySelector('form');
    loginFormElement.addEventListener('submit', onLoginFormSubmit);
    loginFormElement.reset();

    loginViewElement
        .querySelector('a[href="/register"]')
        .addEventListener('click', onLinkClick);
}