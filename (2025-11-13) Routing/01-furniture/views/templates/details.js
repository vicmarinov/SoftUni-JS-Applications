import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export function createDetailsView (furnitureData, isUserOwner) {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Furniture Details</h1>
                </div>
            </div>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src="${furnitureData.img}" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <p>Make: <span>${furnitureData.make}</span></p>
                    <p>Model: <span>${furnitureData.model}</span></p>
                    <p>Year: <span>${furnitureData.year}</span></p>
                    <p>Description: <span>${furnitureData.description}</span></p>
                    <p>Price: <span>${furnitureData.price}</span></p>
                    <p>Material: <span>${furnitureData.material}</span></p>
    
                    ${
                        isUserOwner
                        ? createControlButtons(furnitureData._id)
                        : nothing
                    }
                </div>
            </div>
        </div>
    `;
}

function createControlButtons (furnitureId) {
    return html`
        <div>
            <a href="/edit/${furnitureId}" class="btn btn-info">Edit</a>
            <a href="/delete/${furnitureId}" class="btn btn-red">Delete</a>
        </div>
    `
}