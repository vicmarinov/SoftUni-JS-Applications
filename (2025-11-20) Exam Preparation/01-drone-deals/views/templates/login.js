import { html } from '../../node_modules/lit-html/lit-html.js';
import { onLoginFormSubmit } from '../../event-handlers/login-form-submit.js';

export function createLoginView () {
    return html`
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form class="login-form" @submit=${onLoginFormSubmit}>
                    <input type="text" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <button type="submit">login</button>
                    <p class="message">Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
    `;
}