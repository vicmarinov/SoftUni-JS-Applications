import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";

export async function onLogoutBtnClick (event) {
    await userServices.logoutUser();
    showView(new URL(window.location.origin + '/'));
}