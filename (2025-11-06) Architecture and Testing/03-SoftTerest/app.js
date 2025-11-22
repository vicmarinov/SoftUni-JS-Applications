import { showView } from "./src/utilities/show-view.js";

const startViewURL = new URL(window.location.href);
showView(startViewURL);