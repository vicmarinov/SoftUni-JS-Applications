import page from '../node_modules/page/page.mjs';
import { furnitureDataServices } from '../utilities/furniture-data-services.js';
import { validationServices } from '../utilities/validation-services.js';

export async function onEditFormSubmit (event) {
    event.preventDefault();

    const editForm = event.currentTarget;

    let {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    } = Object.fromEntries(new FormData(editForm).entries());

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
    } = validationServices.validateEditFormInput(
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
            const formField = editForm
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

    editForm.disabled = true;

    const pathname = window.location.pathname;
    const regExpr = /^\/edit\/(?<furnitureId>.+)$/;
    const furnitureId = pathname.match(regExpr)?.groups?.furnitureId;


    await furnitureDataServices.updateFurniture(
        furnitureId,
        make, model, year, description, price, img, material
    );

    editForm.disabled = false;
    page.redirect('/dashboard');
}