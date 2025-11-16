import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";

export function getNavigation () {
    const navigationElement = document.createElement('nav');
    navigationElement.className = 'navbar navbar-expand-lg navbar-dark bg-dark';
    navigationElement.innerHTML = `
        <a class="navbar-brand text-light" href="/" id="homepage-link">Movies</a>
        <ul class="navbar-nav ml-auto">
            ${
                userServices.getUserData('userId') ? `
                    <li class="nav-item user">
                        <a class="nav-link" id="welcome-msg">Welcome, ${userServices.getUserData('userEmail') ? userServices.getUserData('userEmail') : 'email'}</a>
                    </li>
                    <li class="nav-item user">
                        <a class="nav-link" href="javascript:void(0)" id="logout">Logout</a>
                    </li>
                ` : `
                <li class="nav-item guest">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item guest">
                    <a class="nav-link" href="/register">Register</a>
                </li>
                `
            }
        </ul>
    `;

    if (userServices.getUserData('userId')) {
        navigationElement.querySelector('#logout')
            .addEventListener('click', async (event) => {
                event.preventDefault();
                await userServices.logoutUser();
                showView('/');
            });
    }

    navigationElement.querySelectorAll('a').forEach(link => {
        if (!link.href || link.href === 'javascript:void(0)') return;
        
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const linkURL = new URL(link.href);
            showView(linkURL);
        });
    });

    return navigationElement;
}