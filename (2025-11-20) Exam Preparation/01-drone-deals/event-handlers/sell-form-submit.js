import page from '../node_modules/page/page.mjs';
import { dronesDataServices } from '../utilities/drones-data-services.js';
import { validationServices } from '../utilities/validation-services.js';

export async function onSellFormSubmit (event) {
    event.preventDefault();

    const sellForm = event.currentTarget;

    let {
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    } = Object.fromEntries(new FormData(sellForm).entries());

    model = model.trim();
    imageUrl = imageUrl.trim();
    price = price.trim();
    weight = weight.trim();
    phone = phone.trim();
    condition = condition.trim();
    description = description.trim();

    const areInputValuesValid = validationServices.validateSellFormInput(
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    );

    if (!areInputValuesValid) return;

    sellForm.disabled = true;
    await dronesDataServices.createDrone(
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    );

    sellForm.disabled = false;
    page.redirect('/marketplace');
}