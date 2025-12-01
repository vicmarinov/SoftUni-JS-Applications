import { html } from '../../node_modules/lit-html/lit-html.js';

export function createMyFurnitureView (furnitureDataArr) {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>My Furniture</h1>
                    <p>This is a list of your publications.</p>
                </div>
            </div>
            <div class="row space-top">
                ${
                    furnitureDataArr.map(createFurnitureCard)
                }
            </div>
        </div>
    `;
}

function createFurnitureCard (furnitureData) {
    return html`
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${furnitureData.img}" />
                    <p>${furnitureData.description}</p>
                    <footer>
                        <p>Price: <span>${furnitureData.price} $</span></p>
                    </footer>
                    <div>
                        <a href="/details/${furnitureData._id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}