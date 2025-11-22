import { ideasServices } from "../utilities/ideas-services.js";
import { dashboardContentServices } from "../utilities/dashboard-content-services.js";
import { onDashboardClick } from "../utilities/event-handlers/dashboard-click.js";

const dashboardElement = document.querySelector('body > div[data-view-name="dashboard"]');

export async function showDashboardView () {
    document.body.appendChild(dashboardElement);

    const ideasDataArr = await ideasServices.getAllIdeasArrSorted();

    dashboardElement.replaceChildren(
        ...ideasDataArr.map(dashboardContentServices.createIdeaCard)
    );

    if (ideasDataArr.length === 0) {
        dashboardElement.replaceChildren(
            dashboardContentServices.createNoCardsMessage()
        );
    }

    dashboardElement.addEventListener('click', onDashboardClick)
}