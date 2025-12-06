import { html } from '../../node_modules/lit-html/lit-html.js';

export function createHeader (isUserLoggedIn) {
    return html`
        <a id="logo" href="/"><img id="logo" src="/images/logo2.png" alt="img" /></a>
        <nav>
            <div>
                <a href="/marketplace">Marketplace</a>
            </div>

            ${
                isUserLoggedIn
                ? createLoggedInUserNavLinks()
                : createGuestUserNavLinks()
            }
        </nav>
    `;
}

function createLoggedInUserNavLinks () {
    return html`
        <div class="user">
            <a href="/sell">Sell</a>
            <a href="/logout">Logout</a>
        </div>
    `;
}

function createGuestUserNavLinks () {
    return html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `;
}