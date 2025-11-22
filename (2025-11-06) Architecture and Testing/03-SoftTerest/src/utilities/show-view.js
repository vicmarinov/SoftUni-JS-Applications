import { showHomepageView } from "../views/homepage.js";
import { showRegisterView } from "../views/register.js";
import { showLoginView } from "../views/login.js";
import { showDashboardView } from "../views/dashboard.js";
import { showDetailsView } from "../views/details.js";
import { showCreateView } from "../views/create.js";
import { showNavigation } from "../views/navigation.js";
import { showFooter } from "../views/footer.js";

const routes = {
    '/': showHomepageView,
    '/register': showRegisterView,
    '/login': showLoginView,
    '/dashboard': showDashboardView,
    '/details': showDetailsView,
    '/create': showCreateView,
};

export function showView (viewURL) {
    document.body.replaceChildren();
    
    showNavigation();

    try {
        if (!(viewURL instanceof URL)) {
            throw new Error('The view URL is not an instance of the URL() class!');
        }

        const routeName = viewURL.pathname;
        const routeParametersObj = Object.fromEntries(
            viewURL.searchParams.entries()
        );
        
        routes[routeName](routeParametersObj);
    } catch (error) {
        console.error(error.message);
        routes['/']();
    }

    showFooter();
}