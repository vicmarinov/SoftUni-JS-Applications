function validateRegisterFormInput (email, password, repeatPassword) {
    let errorMessage;

    email = email.trim();

    if (!email || !password || !repeatPassword) {
        errorMessage = 'Some required fields are blank! Please fill all of them to register.';
    } else if (email.length < 3) {
        errorMessage = 'The email must be at least 3 characters long! Please check that the email you have entered is correct.';
    } else if (password.length < 3) {
        errorMessage = 'The password must be at least 3 characters long! Try using a stronger one, please.';
    } else if (password !== repeatPassword) {
        errorMessage = 'The passwords do not match! Please make sure both fields contain the same password.';
    }

    if (errorMessage) alert(errorMessage);
    return !errorMessage;
}

function validateLoginFormInput (email, password) {
    let errorMessage;

    email = email.trim();

    if (!email || !password) {
        errorMessage = 'Some required fields are blank! Please fill all of them to log in.';
    }

    if (errorMessage) alert(errorMessage);
    return !errorMessage;
}

function validateCreateFormInput (make, model, year, description, price, imageURL) {
    let areInputValuesValid = true;
    const validationReport = {
        make:        true,
        model:       true,
        year:        true,
        description: true,
        price:       true,
        img:         true
    }

    if (!make || make.length < 4) {
        areInputValuesValid = false;
        validationReport.make = false;
    }

    if (!model || model.length < 4) {
        areInputValuesValid = false;
        validationReport.model = false;
    }

    if (!year || year < 1950 || year > 2050) {
        areInputValuesValid = false;
        validationReport.year = false;
    }

    if (!description || description.length < 10) {
        areInputValuesValid = false;
        validationReport.description = false;
    }

    if (!price || price < 0) {
        areInputValuesValid = false;
        validationReport.price = false;
    }

    if (!imageURL) {
        areInputValuesValid = false;
        validationReport.img = false;
    }

    if (!areInputValuesValid) alert('Some fields contain invalid values! Please make sure you have filled the form in correctly.');
    return {
        areInputValuesValid,
        validationReport
    };
}

function validateEditFormInput (make, model, year, description, price, imageURL) {
    return validateCreateFormInput(
        make,
        model,
        year,
        description,
        price,
        imageURL
    );
}

export const validationServices = {
    validateRegisterFormInput,
    validateLoginFormInput,
    validateCreateFormInput,
    validateEditFormInput
};