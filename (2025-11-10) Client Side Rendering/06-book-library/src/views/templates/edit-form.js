import { html } from "../../../node_modules/lit-html/lit-html.js";
import { booksServices } from "../../utilities/books-services.js";
import { onEditFormSubmit } from "../../utilities/event-handlers/edit-form-submit.js";

export async function createEditForm (bookId) {
    const { title, author } = await booksServices.getBook(bookId);

    return html`
        <form id="edit-form" @submit=${onEditFormSubmit}>
            <input type="hidden" name="id" value=${bookId}>
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." value="${title}">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." value="${author}">
            <input type="submit" value="Save">
        </form>
    `;
}