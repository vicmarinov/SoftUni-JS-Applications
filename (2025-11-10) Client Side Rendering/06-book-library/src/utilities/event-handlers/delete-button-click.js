import { renderPageContent } from "../../views/render-page-content.js";
import { booksServices } from "../books-services.js";

export async function onDeleteBtnClick (event) {
    const deleteBtnClicked = event.target;
    const tableRow = deleteBtnClicked.parentElement.parentElement;
    const bookId = tableRow.dataset.bookId;

    await booksServices.deleteBook(bookId);
    renderPageContent();
}