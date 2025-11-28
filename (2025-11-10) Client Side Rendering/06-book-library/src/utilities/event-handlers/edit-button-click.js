import { renderPageContent } from "../../views/render-page-content.js";

export function onEditBtnClick (event) {
    const editBtnClicked = event.target;
    const tableRow = editBtnClicked.parentElement.parentElement;
    const bookId = tableRow.dataset.bookId;

    renderPageContent(true, true, bookId);
}