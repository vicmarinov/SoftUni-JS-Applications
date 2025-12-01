import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { userServices } from '../utilities/user-services.js';
import { furnitureDataServices } from '../utilities/furniture-data-services.js';
import { createHeader } from './templates/header.js';
import { createDashboardView } from './templates/dashboard.js';
import { createMyFurnitureView } from './templates/my-furniture.js';
import { createRegisterView } from './templates/register.js';
import { createLoginView } from './templates/login.js';
import { createCreateView } from './templates/create.js';
import { createDetailsView } from './templates/details.js';
import { createEditView } from './templates/edit.js';

function showHeader (context) {
    render(createHeader(), context.headerContainer);
}

async function showDashboardView (context) {
    const furnitureDataArr = await furnitureDataServices.getAllFurniture();
    render(createDashboardView(furnitureDataArr), context.mainContainer);
}

async function showMyFurnitureView (context) {
    const userId = userServices.getUserData.id();
    const furnitureDataArr = await furnitureDataServices
        .getUserOwnedFurniture(userId);

    render(createMyFurnitureView(furnitureDataArr), context.mainContainer);
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

function showCreateView (context) {
    render(createCreateView(), context.mainContainer);
}

async function showDetailsView (context) {
    const furnitureId = context.params.furnitureId;
    const furnitureData = await furnitureDataServices
        .getConcreteFurniture(furnitureId);

    const userId = userServices.getUserData.id();
    const isUserOwner = furnitureData._ownerId === userId;

    render(createDetailsView(furnitureData, isUserOwner), context.mainContainer);
}

async function showEditView (context) {
    const furnitureId = context.params.furnitureId;
    const furnitureData = await furnitureDataServices
        .getConcreteFurniture(furnitureId);

    render(createEditView(furnitureData), context.mainContainer);
}

async function showDeleteView (context) {
    // alert('WARNING: You are about to delete this piece of furniture!');

    // const isConfirmed = confirm('You are about to delete this piece of furniture. Do you want to proceed?');
    // if (!isConfirmed) return;

    const furnitureId = context.params.furnitureId;
    await furnitureDataServices.deleteFurniture(furnitureId);
    page.redirect('/dashboard');
}

export const showView = {
    header: showHeader,
    dashboard: showDashboardView,
    myFurniture: showMyFurnitureView,
    register: showRegisterView,
    login: showLoginView,
    logout: showLogoutView,
    create: showCreateView,
    details: showDetailsView,
    edit: showEditView,
    delete: showDeleteView
};