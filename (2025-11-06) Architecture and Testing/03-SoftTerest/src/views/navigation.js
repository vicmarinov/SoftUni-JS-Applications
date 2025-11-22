import { userServices } from "../utilities/user-services.js";
import { onNavigationClick } from "../utilities/event-handlers/navigation-click.js";

const navigationElement = document.querySelector('body > nav');

export function showNavigation () {
    document.body.appendChild(navigationElement);

    navigationElement.addEventListener('click', onNavigationClick);

    if (userServices.getUserData.id()) {
        navigationElement
            .querySelectorAll('ul > li[data-user-status="logged in"]')
            .forEach(element => element.style.display = 'inline');

        navigationElement
            .querySelectorAll('ul > li[data-user-status="guest"]')
            .forEach(element => element.style.display = 'none');
    } else {
        navigationElement
            .querySelectorAll('ul > li[data-user-status="logged in"]')
            .forEach(element => element.style.display = 'none');
        
        navigationElement
            .querySelectorAll('ul > li[data-user-status="guest"]')
            .forEach(element => element.style.display = 'inline');
    }
}