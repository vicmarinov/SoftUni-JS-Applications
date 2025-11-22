import { onLinkClick } from "../utilities/event-handlers/link-click.js";

const homepageElement = document.querySelector('body > div[data-view-name="homepage"]');

export function showHomepageView () {
    document.body.appendChild(homepageElement);
    
    homepageElement
        .querySelector('a[href="/dashboard"]')
        .addEventListener('click', onLinkClick);
}