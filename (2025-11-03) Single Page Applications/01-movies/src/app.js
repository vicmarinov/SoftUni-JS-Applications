import { showView } from "./show-view.js";

const startViewURL = new URL(window.location.href);
showView(startViewURL);