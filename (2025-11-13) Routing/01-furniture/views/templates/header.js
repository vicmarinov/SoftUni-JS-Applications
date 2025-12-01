import { html } from '../../node_modules/lit-html/lit-html.js';
import { userServices } from '../../utilities/user-services.js';

export function createHeader () {
    return html`
        <header>
            <h1><a href="/">Furniture Store</a></h1>
            <nav>
                <a id="catalogLink" href="/dashboard">Dashboard</a>

                ${
                    userServices.getUserData.id()
                    ? createLoggedInUserNavLinks()
                    : createGuestUserNavLinks()
                }
            </nav>
        </header>
    `;
}

function createLoggedInUserNavLinks () {
    return html`
        <div id="user">
            <a id="createLink" href="/create">Create Furniture</a>
            <a id="profileLink" href="/my-furniture">My Publications</a>
            <a id="logoutBtn" href="/logout">Logout</a>
        </div>
    `;
}

function createGuestUserNavLinks () {
    return html`
        <div id="guest">
            <a id="loginLink" href="/login">Login</a>
            <a id="registerLink" href="/register">Register</a>
        </div>
    `;
}
