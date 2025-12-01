import page from '../node_modules/page/page.mjs';
import { furnitureDataServices } from '../utilities/furniture-data-services.js';
import { validationServices } from '../utilities/validation-services.js';

export async function onCreateFormSubmit (event) {
    event.preventDefault();

    const createForm = event.currentTarget;

    let {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    } = Object.fromEntries(new FormData(createForm).entries());

    make = make.trim();
    model = model.trim();
    year = Number(year);
    description = description.trim();
    price = Number(price);
    img = img.trim();
    material = material.trim();

    const {
        areInputValuesValid,
        validationReport
    } = validationServices.validateCreateFormInput(
        make,
        model,
        year,
        description,
        price,
        img
    );

    if (!areInputValuesValid) {
        for (const fieldName in validationReport) {
            const isFieldValid = validationReport[fieldName];
            const formField = createForm
                .querySelector(`input[name="${fieldName}"]`);

            if (isFieldValid) {
                formField.classList.add('is-valid');
                formField.classList.remove('is-invalid');
            } else {
                formField.classList.add('is-invalid');
                formField.classList.remove('is-valid');
            }
        }

        return;
    }

    createForm.disabled = true;
    await furnitureDataServices.createFurniture(
        make,
        model,
        year,
        description,
        price,
        img,
        material
    );

    createForm.disabled = false;
    page.redirect('/dashboard');
}