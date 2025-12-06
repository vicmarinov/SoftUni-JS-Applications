import { html } from '../../node_modules/lit-html/lit-html.js';

export function createMarketplaceView (dronesDataArr) {
    return html`
        <h3 class="heading">Marketplace</h3>
        <section id="dashboard">            
            ${
                !dronesDataArr.length
                ? html`<h2 class="no-drones">No Drones Available</h2>`
                : dronesDataArr.map(createDroneCard)
            }
        </section>
    `;
}

function createDroneCard (droneData) {
    return html`
        <div class="drone">
            <img src="${droneData.imageUrl}" alt="drone image" />
            <h3 class="model">${droneData.model}</h3>
            <div class="drone-info">
                <p class="price">Price: €${droneData.price}</p>
                <p class="condition">Condition: ${droneData.condition}</p>
                <p class="weight">Weight: ${droneData.weight}g</p>
            </div>
            <a class="details-btn" href="${`/details/${droneData._id}`}">Details</a>
        </div>
    `;
}