import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export function createDetailsView (droneData, isUserOwner) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <div>
                    <img id="details-img" src="${droneData.imageUrl}" alt="drone image" />
                    <p id="details-model">${droneData.model}</p>
                </div>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p class="details-price">Price: €${droneData.price}</p>
                        <p class="details-condition">Condition: ${droneData.condition}</p>
                        <p class="details-weight">Weight: ${droneData.weight}g</p>
                        <p class="drone-description">${droneData.description}</p>
                        <p class="phone-number">Phone: ${droneData.phone}</p>
                    </div>

                    ${
                        isUserOwner ? createControlButtons(droneData._id) : nothing
                    }
                </div>
            </div>
        </section>
    `;
}

function createControlButtons (droneId) {
    return html`
        <div class="buttons">
            <a href="${`/edit/${droneId}`}" id="edit-btn">Edit</a>
            <a href="${`/delete/${droneId}`}" id="delete-btn">Delete</a>
        </div>
    `;
}