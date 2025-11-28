import { onEditBtnClick } from "./edit-button-click.js";
import { onDeleteBtnClick } from "./delete-button-click.js";

export function onBooksTableBodyClick (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName !== 'BUTTON') return;

    if (clickedElement.textContent === 'Edit') {
        onEditBtnClick(event);
    } else if (clickedElement.textContent === 'Delete') {
        onDeleteBtnClick(event);
    }
}