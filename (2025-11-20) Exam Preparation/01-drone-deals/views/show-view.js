import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { userServices } from '../utilities/user-services.js';
import { dronesDataServices } from '../utilities/drones-data-services.js';
import { createHeader } from './templates/header.js';
import { createHomepage } from './templates/homepage.js';
import { createRegisterView } from './templates/register.js';
import { createLoginView } from './templates/login.js';
import { createMarketplaceView } from './templates/marketplace.js';
import { createDetailsView } from './templates/details.js';
import { createSellView } from './templates/sell.js';
import { createEditView } from './templates/edit.js';

function showHeader (context) {
    const isUserLoggedIn = !!userServices.getUserData.id();
    render(createHeader(isUserLoggedIn), context.headerContainer);
}

function showHomepage (context) {
    render(createHomepage(), context.mainContainer);
}

async function showMarketplaceView (context) {
    const dronesDataArr = await dronesDataServices.getAllDrones();
    render(createMarketplaceView(dronesDataArr), context.mainContainer);
}

function showRegisterView (context) {
    render(createRegisterView(), context.mainContainer);
}

function showLoginView (context) {
    render(createLoginView(), context.mainContainer);
}

async function showLogoutView () {
    await userServices.logoutUser();
    page.redirect('/');
}

function showSellView (context) {
    render(createSellView(), context.mainContainer);
}

async function showDetailsView (context) {
    const droneId = context.params.droneId;
    const droneData = await dronesDataServices.getConcreteDrone(droneId);

    const userId = userServices.getUserData.id();
    const isUserOwner = droneData._ownerId === userId;

    render(createDetailsView(droneData, isUserOwner), context.mainContainer);
}

async function showEditView (context) {
    const droneId = context.params.droneId;
    const droneData = await dronesDataServices.getConcreteDrone(droneId);

    const userId = userServices.getUserData.id();
    const isUserOwner = droneData._ownerId === userId;

    if (!isUserOwner) page.redirect('/');

    render(createEditView(droneData), context.mainContainer);
}

async function showDeleteView (context) {
    const isConfirmed = confirm('You are about to delete this drone. Do you want to proceed?');
    if (!isConfirmed) return;

    const droneId = context.params.droneId;
    await dronesDataServices.deleteDrone(droneId);
    page.redirect('/marketplace');
}

export const showView = {
    header: showHeader,
    homepage: showHomepage,
    marketplace: showMarketplaceView,
    register: showRegisterView,
    login: showLoginView,
    logout: showLogoutView,
    sell: showSellView,
    details: showDetailsView,
    edit: showEditView,
    delete: showDeleteView
};