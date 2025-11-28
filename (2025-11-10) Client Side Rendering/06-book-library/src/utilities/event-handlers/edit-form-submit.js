import { renderPageContent } from "../../views/render-page-content.js";
import { booksServices } from "../books-services.js";

export async function onEditFormSubmit (event) {
    event.preventDefault();

    const editForm = event.currentTarget;
    const {
        id,
        title,
        author
    } = Object.fromEntries(new FormData(editForm).entries());

    if (!title || !author) {
        alert('Both the title and the author fields are required! Please ensure you have filled them in correctly.');
        return;
    }

    await booksServices.updateBook(id, title, author);
    renderPageContent(true, false);
}