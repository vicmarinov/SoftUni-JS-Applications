import { html, render } from './node_modules/lit-html/lit-html.js';

const URL = 'http://localhost:3030/jsonstore/advanced/dropdown';

const dropdownContainer = document.getElementById('menu').parentElement;
const addForm = document.querySelector('body > article > form');
addForm.addEventListener('submit', addOption)

loadDropdown();

async function loadDropdown () {
    let optionsDataArr;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        optionsDataArr = Object.values(data);
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }

    render(createSelectDropdown(optionsDataArr), dropdownContainer);
}

async function addOption (event) {
    event.preventDefault();

    const newOptionText = new FormData(addForm).get('newOptionText');
    addForm.reset();

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ text: newOptionText })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }

    loadDropdown();
}

function createSelectDropdown (optionsDataArr) {
    return html`
        <select id="menu">
            ${optionsDataArr.map(createOption)}
        </select>
    `;
}

function createOption ({ text, _id }) {
    return html`<option value="${_id}">${text}</option>`;
}