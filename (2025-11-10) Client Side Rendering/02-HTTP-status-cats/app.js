import { cats as catsDataArr } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const rootSection = document.querySelector('section#allCats');
render(createCastList(catsDataArr), rootSection);
rootSection.addEventListener('click', toggleCatCard);

function createCastList (catsDataArr) {
    return html`
        <ul>
            ${catsDataArr.map(createCatCard)}
        </ul>
    `;
}

function createCatCard (catData) {
    return html`
        <li>
            <img src="./images/${catData.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${catData.id}">
                    <h4>Status Code: ${catData.statusCode}</h4>
                    <p>${catData.statusMessage}</p>
                </div>
            </div>
        </li>
    `;
}

function toggleCatCard (event) {
    const toggleBtn = event.target;

    if (
        toggleBtn.tagName !== 'BUTTON' ||
        !toggleBtn.classList.contains('showBtn')
    ) return;

    const catInfoContainer = toggleBtn
        .parentElement
        .querySelector('div.status');

    if (catInfoContainer.style.display === 'none') {
        catInfoContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide status code';
    } else {
        catInfoContainer.style.display = 'none';
        toggleBtn.textContent = 'Show status code';
    }
}