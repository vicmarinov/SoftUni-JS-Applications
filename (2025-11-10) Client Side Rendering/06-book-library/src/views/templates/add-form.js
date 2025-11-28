import { html } from "../../../node_modules/lit-html/lit-html.js";
import { onAddFormSubmit } from "../../utilities/event-handlers/add-form-submit.js";

export function createAddForm () {
    return html`
        <form id="add-form" @submit=${onAddFormSubmit}>
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form>
    `;
}