import { showView } from "../show-view.js";
import { onLogoutBtnClick } from "./logout-button-click.js";

export function onNavigationClick (event) {
    event.preventDefault();
    
    let navLinkElement = event.target;

    if (navLinkElement.tagName === 'IMG') {
        navLinkElement = navLinkElement.parentElement;
    }
    
    if (navLinkElement.tagName !== 'A') return;

    if(navLinkElement.href === 'javascript:void(0)') {
        onLogoutBtnClick(event);
        return;
    }

    showView(new URL(navLinkElement.href));
}