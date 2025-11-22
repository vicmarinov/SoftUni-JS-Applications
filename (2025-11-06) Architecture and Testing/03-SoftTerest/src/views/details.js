import { ideasServices } from "../utilities/ideas-services.js";
import { userServices } from "../utilities/user-services.js";
import { onDeleteBtnClick } from "../utilities/event-handlers/delete-button-click.js";

const detailsViewElement = document.querySelector('body > div[data-view-name="details"]');
const deleteBtnContainer = detailsViewElement.querySelector('div.text-center');

export async function showDetailsView ({ ideaId }) {
    deleteBtnContainer.remove();
    document.body.appendChild(detailsViewElement);

    const ideaData = await ideasServices.getConcreteIdeaData(ideaId);

    detailsViewElement.querySelector('img.det-img').src = ideaData.img;
    detailsViewElement.querySelector('div.desc > h2.display-5').textContent = ideaData.title;
    detailsViewElement.querySelector('div.desc > p.idea-description').textContent = ideaData.description;


    if (userServices.getUserData.id() && ideaData._ownerId === userServices.getUserData.id()) {
        detailsViewElement.appendChild(deleteBtnContainer);
    }
    
    const deleteBtn = detailsViewElement.querySelector('div.text-center > a.btn.detb');
    deleteBtn.href = `/delete?ideaId=${ideaData._id}`;
    deleteBtn.addEventListener('click', onDeleteBtnClick);
}