import { showView } from "../show-view.js";

export function onDashboardClick (event) {
    event.preventDefault();

    const detailsBtnClicked = event.target;

    if (
        detailsBtnClicked.tagName !== 'A' ||
        !detailsBtnClicked.classList.contains('btn') ||
        detailsBtnClicked.textContent !== 'Details'
    ) return;

    showView(new URL(detailsBtnClicked.href));
}