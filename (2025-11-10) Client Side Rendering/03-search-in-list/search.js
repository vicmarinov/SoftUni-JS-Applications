import { towns as townsNamesArr } from "./towns.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const listContainer = document.getElementById('towns');
const inputField = document.getElementById('searchText');
const resultMessageField = document.getElementById('result');

document.querySelector('body > article > button')
    .addEventListener('click', search);

render(createList(townsNamesArr), listContainer);

function search () {
    const searchedText = inputField.value ? inputField.value : undefined;
    inputField.value = '';

    render(createList(townsNamesArr, searchedText), listContainer);
    
    const matchesCount = townsNamesArr
        .filter(name => name.includes(searchedText))
        .length;
    
    resultMessageField.textContent = `${matchesCount} matches found`;
}

function createList (listContentArr, searchedText) {
    return html`
        <ul>
            ${
                listContentArr.map(content => createListItem(content, searchedText))
            }
        </ul>
    `;
}

function createListItem (content, searchedText) {
    return html`
        <li class="${content.includes(searchedText) ? 'active' : ''}">
            ${content}
        </li>
    `;
}