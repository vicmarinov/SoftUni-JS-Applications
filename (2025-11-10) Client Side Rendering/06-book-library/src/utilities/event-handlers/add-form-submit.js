import { renderPageContent } from "../../views/render-page-content.js";
import { booksServices } from "../books-services.js";

export function onAddFormSubmit (event) {
    event.preventDefault();
    
    const addForm = event.currentTarget;
    const {
        title,
        author
    } = Object.fromEntries(new FormData(addForm).entries());

    if (!title || !author) {
        alert('Both the title and the author fields are required! Please ensure you have filled them in correctly.');
        return;
    }

    booksServices.addBook(title, author);
    
    addForm.reset();
    renderPageContent();
}