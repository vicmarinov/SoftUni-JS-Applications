import { html, render } from "./node_modules/lit-html/lit-html.js";

const rootContainer = document.getElementById('root');

document.getElementsByTagName('form')[0]
    .addEventListener('submit', onFormSubmit);

function onFormSubmit (event) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const townsInputStr = new FormData(formElement).get('towns');
    const townsNamesArr = townsInputStr.split(', ');

    render(townsListTemplate(townsNamesArr), rootContainer);
    formElement.reset();
}

const townsListTemplate = townsNamesArr => html`
    <ul>
        ${townsNamesArr.map(townListItemTemplate)}
    </ul>
`;

const townListItemTemplate = townName => html`<li>${townName}</li>`;