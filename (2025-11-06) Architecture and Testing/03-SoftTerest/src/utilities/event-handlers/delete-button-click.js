import { showView } from "../show-view.js";
import { ideasServices } from "../ideas-services.js";

export async function onDeleteBtnClick (event) {
    event.preventDefault();

    const deleteBtnClicked = event.currentTarget;
    const ideaId = new URL(deleteBtnClicked.href).searchParams.get('ideaId');

    await ideasServices.deleteConcreteIdea(ideaId);

    showView(new URL(window.location.origin + '/dashboard'));
}