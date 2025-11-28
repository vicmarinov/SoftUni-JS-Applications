import { html, nothing } from "../../../node_modules/lit-html/lit-html.js";
import { booksServices } from "../../utilities/books-services.js";
import { createBooksTableRow } from "./books-table-row.js";
import { onBooksTableBodyClick } from "../../utilities/event-handlers/books-table-body-click.js";

export async function createBooksTable (isInBooksLoadedMode) {
    return html`
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody @click=${onBooksTableBodyClick}>
                ${
                    isInBooksLoadedMode
                    ? Object
                        .entries(await booksServices.getAllBooks())
                        .map(createBooksTableRow)
                    : nothing
                }
            </tbody>
        </table>
    `;
}