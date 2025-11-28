import { html } from "../../../node_modules/lit-html/lit-html.js";

export function createBooksTableRow ([bookId, { author, title }]) {
    return html`
        <tr data-book-id="${bookId}">
            <td>${title}</td>
            <td>${author}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    `;
}