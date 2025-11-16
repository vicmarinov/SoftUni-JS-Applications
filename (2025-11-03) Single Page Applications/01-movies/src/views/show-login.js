import { getNavigation } from "./get-navigation.js";
import { getFooter } from "./get-footer.js";
import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";

export function showLogin () {
    const container = document.getElementById('container');
    container.innerHTML = '';

    container.appendChild(getNavigation());

    const loginSectionElement = document.createElement('section');
    loginSectionElement.id = 'form-login';
    loginSectionElement.className = 'view-section';
    loginSectionElement.innerHTML = `
        <form id="login-form" class="text-center border border-light p-5" action="" method="">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    `;

    loginSectionElement.querySelector('form#login-form')
        .addEventListener('submit', onLoginFormSubmit);

    container.appendChild(loginSectionElement);

    container.appendChild(getFooter());
}

async function onLoginFormSubmit (event) {
    event.preventDefault();

    const loginForm = event.currentTarget;
    const {email, password} = Object.fromEntries(new FormData(loginForm).entries());

    if (!email || !password) {
        alert('All the fields are required!');
        return;
    }

    await userServices.loginUser(email, password);
    showView('/');
}