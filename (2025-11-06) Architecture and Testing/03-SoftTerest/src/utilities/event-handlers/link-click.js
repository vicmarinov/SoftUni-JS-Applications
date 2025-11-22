import { showView } from "../show-view.js";

export function onLinkClick (event) {
    event.preventDefault();

    const linkElement = event.currentTarget;
    showView(new URL(linkElement.href));
}