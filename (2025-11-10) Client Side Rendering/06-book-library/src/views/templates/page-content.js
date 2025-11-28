import { html } from "../../../node_modules/lit-html/lit-html.js";
import { createBooksTable } from "./books-table.js";
import { createAddForm } from "./add-form.js";
import { createEditForm } from "./edit-form.js";
import { onLoadAllBooksBtnClick } from "../../utilities/event-handlers/load-all-books-button-click.js";

export async function createPageContent (isInBooksLoadedMode, isInEditMode, editBookId) {
    return html`
        <button id="loadBooks" @click=${onLoadAllBooksBtnClick}>LOAD ALL BOOKS</button>

        ${await createBooksTable(isInBooksLoadedMode)}

        ${isInEditMode ? await createEditForm(editBookId) : createAddForm()}
    `;
}