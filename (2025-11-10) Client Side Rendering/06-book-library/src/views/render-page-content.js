import { render } from "../../node_modules/lit-html/lit-html.js";
import { createPageContent } from "./templates/page-content.js";

export async function renderPageContent (isInBooksLoadedMode = true, isInEditMode = false, editBookId) {
    render(await createPageContent(isInBooksLoadedMode, isInEditMode, editBookId), document.body);
}