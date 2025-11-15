window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadBooks').addEventListener('click', loadBooks);
    document.querySelector('form').addEventListener('submit', createBookRecord);
    
    loadBooks();
});

const URL = 'http://localhost:3030/jsonstore/collections/books';

async function loadBooks () {
    const tableBody = document.querySelector('table > tbody');

    try {
        const response = await fetch(URL);
        const booksDataObj = await response.json();

        if (!response.ok) throw new Error(booksDataObj.message);

        tableBody.innerHTML = '';

        Object.entries(booksDataObj).forEach(([id, {author, title}]) => {
            const tableRow = document.createElement('tr');
            tableRow.dataset.bookId = id;

            const titleCell = document.createElement('td');
            titleCell.textContent = title;
            tableRow.appendChild(titleCell);
            
            const authorCell = document.createElement('td');
            authorCell.textContent = author;
            tableRow.appendChild(authorCell);

            const buttonsContainerCell = document.createElement('td');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', editBookRecord);
            buttonsContainerCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteBookRecord);
            buttonsContainerCell.appendChild(deleteBtn);

            tableRow.appendChild(buttonsContainerCell);

            tableBody.appendChild(tableRow);
        });
    } catch (error) {
        alert(error);
    }
}

async function createBookRecord (event) {
    event.preventDefault();

    const editForm = event.currentTarget;

    const editFormDataObj = Object.fromEntries(new FormData(editForm).entries());

    const bookTitle = editFormDataObj.title;
    const bookAuthor = editFormDataObj.author;

    if (!bookTitle || !bookAuthor) {
        alert('The book must have the title and the author fields filled!');
        return;
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({title: bookTitle, author: bookAuthor})
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadBooks();
        editForm.reset();
    } catch (error) {
        alert(error);
    }
}

function editBookRecord (event) {
    const tableRow = event.currentTarget.parentElement.parentElement;
    const rowCells = tableRow.getElementsByTagName('td');

    const bookTitle = rowCells[0].textContent;
    const bookAuthor = rowCells[1].textContent;
    const bookId = tableRow.dataset.bookId;

    const editForm = document.querySelector('form');
    
    editForm.removeEventListener('submit', createBookRecord);
    editForm.addEventListener('submit', submitEditsOfBookRecord);

    editForm.dataset.bookId = bookId;
    editForm.querySelector('h3').textContent = 'Edit FORM';
    editForm.querySelector('button[type="submit"]').textContent = 'Save';
    editForm.querySelector('input[name="title"]').value = bookTitle;
    editForm.querySelector('input[name="author"]').value = bookAuthor;
}

async function submitEditsOfBookRecord (event) {
    event.preventDefault();

    const editForm = event.currentTarget;

    const editFormDataObj = Object.fromEntries(new FormData(editForm).entries());

    const bookTitle = editFormDataObj.title;
    const bookAuthor = editFormDataObj.author;
    const bookId = editForm.dataset.bookId;

    if (!bookTitle || !bookAuthor) {
        alert('The book must have the title and the author fields filled!');
        return;
    }

    try {
        const response = await fetch(URL + `/${bookId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({title: bookTitle, author: bookAuthor})
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadBooks();

        editForm.reset();
        editForm.removeEventListener('submit', submitEditsOfBookRecord);
        editForm.addEventListener('submit', createBookRecord);
        editForm.querySelector('h3').textContent = 'FORM';
        editForm.querySelector('button[type="submit"]').textContent = 'Submit';
        delete editForm.dataset.bookId;
    } catch (error) {
        alert(error);
    }
}

async function deleteBookRecord (event) {
    const tableRow = event.currentTarget.parentElement.parentElement;
    const bookId = tableRow.dataset.bookId;

    try {
        const response = await fetch(URL + `/${bookId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadBooks();
    } catch (error) {
        alert(error);
    }
}