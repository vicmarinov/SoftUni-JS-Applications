import { getNavigation } from "./get-navigation.js";
import { getFooter } from "./get-footer.js";
import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";

export function showRegister () {
    const container = document.getElementById('container');
    container.innerHTML = '';

    container.appendChild(getNavigation());

    const registerSectionElement = document.createElement('section');
    registerSectionElement.id = 'form-sign-up';
    registerSectionElement.className = 'view-section';
    registerSectionElement.innerHTML = `
        <form id="register-form" class="text-center border border-light p-5" action="" method="">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
            </div>
            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="" />
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    `;

    registerSectionElement.querySelector('form#register-form')
        .addEventListener('submit', onRegisterFormSubmit);

    container.appendChild(registerSectionElement);

    container.appendChild(getFooter());
}

async function onRegisterFormSubmit (event) {
    event.preventDefault();

    const registerForm = event.currentTarget;
    const {email, password, repeatPassword} = Object.fromEntries(
        new FormData(registerForm).entries()
    );

    if (!email || !password || !repeatPassword) {
        alert('All the fields are required!');
        return;
    }

    if (password.length < 6) {
        alert('The password must be at least 6 characters long!');
        return;
    }

    if (password !== repeatPassword) {
        alert('The passwords do not match!');
        return;
    }

    await userServices.registerUser(email, password);
    showView('/');
}