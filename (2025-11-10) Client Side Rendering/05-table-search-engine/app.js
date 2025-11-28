import { html, render, nothing } from "./node_modules/lit-html/lit-html.js";

loadTable();

async function loadTable (searchedText) {
    const recordsDataArr = await getRecordsDataArr();
    render(createTable(recordsDataArr, searchedText), document.body);
}

function searchInTable (event) {
    const searchField = document.getElementById('searchField');

    const searchedText = searchField.value;
    if (!searchedText) return;
    searchField.value = '';

    loadTable(searchedText);
}

async function getRecordsDataArr () {
    const URL = 'http://localhost:3030/jsonstore/advanced/table';
    
    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        return Object.values(data);
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }
}

function createTable (recordsDataArr, searchedText) {
    return html`
        <table class="container">
            <thead>
                <tr>
                    <th>Student name</th>
                    <th>Student email</th>
                    <th>Student course</th>
                </tr>
            </thead>
            <tbody>
                ${recordsDataArr.map(data => createTableRow(data, searchedText))}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">
                        <input type="text" id="searchField" />
                        <button type="button" id="searchBtn" @click=${searchInTable}>Search</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    `;
}

function createTableRow (recordData, searchedText) {
    const fullName = `${recordData.firstName} ${recordData.lastName}`;
    const email = String(recordData.email);
    const course = String(recordData.course);

    const isMatched = fullName.toLowerCase().includes(searchedText?.toLowerCase()) || 
                      email.toLowerCase().includes(searchedText?.toLowerCase())    || 
                      course.toLowerCase().includes(searchedText?.toLowerCase());
    
    return html`
        <tr class="${isMatched ? 'select' : nothing}">
            <td>${fullName}</td>
            <td>${email}</td>
            <td>${course}</td>
        </tr>
    `;
}