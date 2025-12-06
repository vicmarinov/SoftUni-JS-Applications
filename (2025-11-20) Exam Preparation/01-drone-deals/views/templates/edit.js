import { html } from '../../node_modules/lit-html/lit-html.js';
import { onEditFormSubmit } from '../../event-handlers/edit-form-submit.js';

export function createEditView (droneData) {
    return html`
        <section id="edit">
            <div class="form form-item">
                <h2>Edit Offer</h2>
                <form class="edit-form" @submit=${onEditFormSubmit}>
                    <input type="text" name="model" .value="${droneData.model}" id="model" placeholder="Drone Model" />
                    <input type="text" name="imageUrl" .value="${droneData.imageUrl}" id="imageUrl" placeholder="Image URL" />
                    <input type="number" name="price" .value="${droneData.price}" id="price" placeholder="Price" />
                    <input type="number" name="weight" .value="${droneData.weight}" id="weight" placeholder="Weight" />
                    <input type="number" name="phone" .value="${droneData.phone}" id="phone" placeholder="Phone Number for Contact" />
                    <input type="text" name="condition" .value="${droneData.condition}" id="condition" placeholder="Condition" />
                    <textarea name="description" .value="${droneData.description}" id="description" placeholder="Description"></textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}