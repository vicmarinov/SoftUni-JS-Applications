import page from '../node_modules/page/page.mjs';
import { dronesDataServices } from '../utilities/drones-data-services.js';
import { validationServices } from '../utilities/validation-services.js';

export async function onEditFormSubmit (event) {
    event.preventDefault();

    const editForm = event.currentTarget;

    let {
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    } = Object.fromEntries(new FormData(editForm).entries());

    model = model.trim();
    imageUrl = imageUrl.trim();
    price = price.trim();
    weight = weight.trim();
    phone = phone.trim();
    condition = condition.trim();
    description = description.trim();

    const areInputValuesValid = validationServices.validateEditFormInput(
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    );

    if (!areInputValuesValid) return;

    editForm.disabled = true;

    const pathname = window.location.pathname;
    const regExpr = /^\/edit\/(?<droneId>.+)$/;
    const droneId = pathname.match(regExpr)?.groups?.droneId;

    await dronesDataServices.updateDrone(
        droneId,
        model, imageUrl, price, weight, phone, condition, description
    );

    editForm.disabled = false;
    page.redirect(`/details/${droneId}`);
}