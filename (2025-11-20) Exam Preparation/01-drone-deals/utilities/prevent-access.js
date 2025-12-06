import page from '../node_modules/page/page.mjs';
import { userServices } from './user-services.js';

function allowOnlyLoggedUsers (context, next) {
    if (!userServices.getUserData.id()) {
        page.redirect('/login');
        return;
    }

    next();
}

function allowOnlyGuestUsers (context, next) {
    if (userServices.getUserData.id()) {
        page.redirect('/');
        return;
    }

    next();
}

export const preventAccess = {
    allowOnlyLoggedUsers,
    allowOnlyGuestUsers
};