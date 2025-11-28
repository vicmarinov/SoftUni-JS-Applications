import { requestsAPI } from "./requests-api.js";

const BASE_URL = 'http://localhost:3030/jsonstore/collections/books';

const ENDPOINTS = {
    allBooks: BASE_URL,
    concreteBook: (id) => BASE_URL + `/${id}`
};

async function getAllBooks () {
    return await requestsAPI.get(ENDPOINTS.allBooks);
}

async function getBook (id) {
    return await requestsAPI.get(ENDPOINTS.concreteBook(id));
}

async function addBook (title, author) {
    await requestsAPI.post(ENDPOINTS.allBooks, { title, author });
}

async function updateBook (id, title, author) {
    await requestsAPI.put(ENDPOINTS.concreteBook(id), { title, author });
}

async function deleteBook (id) {
    await requestsAPI.delete(ENDPOINTS.concreteBook(id));
}

export const booksServices = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
};