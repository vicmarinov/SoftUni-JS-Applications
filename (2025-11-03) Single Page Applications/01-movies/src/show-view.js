import { showHomepage } from "./views/show-homepage.js";
import { showLogin } from "./views/show-login.js";
import { showRegister } from "./views/show-register.js";
import { showAddMovie } from "./views/show-add-movie.js";
import { showMovieDetails } from "./views/show-movie-details.js";
import { showEditMovie } from "./views/show-edit-movie.js";

const showViewFunctions = {
    '/': showHomepage,
    '/login': showLogin,
    '/register': showRegister,
    '/details': showMovieDetails,
    '/add': showAddMovie,
    '/edit': showEditMovie
};

export function showView (viewURL) {
    // The `viewURL` can be both in the format of an URL
    // object or in the format of a string pathname.
    // E.g.:
    //     both `new URL('http://127.0.0.1:5500/edit/123')`
    //     and `'/edit/123'`
    //     are valid values for `viewURL`.

    try {
        let viewURLPathname;
    
        if (viewURL instanceof URL) {
            viewURLPathname = viewURL.pathname;
        } else {
            viewURLPathname = viewURL;
        }
    
    
        let [view, movieId] = viewURLPathname
            .split('/')
            .filter(x => x !== '');
        
        if (!view) view = '';
        view = `/${view}`;
    
        showViewFunctions[view](movieId);
    } catch (error) {
        showViewFunctions['/']();
    }
}