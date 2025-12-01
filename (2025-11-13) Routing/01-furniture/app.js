import page from './node_modules/page/page.mjs';
import { preventAccess } from './utilities/prevent-access.js';
import { showView } from './views/show-view.js';

page('*', (context, next) => {
    context.headerContainer = document.querySelector('#headerContainer');
    context.mainContainer = document.querySelector('#mainContainer');

    showView.header(context);

    next();
});

page('/', showView.dashboard);
page('/dashboard', '/');
page('/my-furniture', preventAccess.allowOnlyLoggedUsers, showView.myFurniture);
page('/register', preventAccess.allowOnlyGuestUsers, showView.register);
page('/login', preventAccess.allowOnlyGuestUsers, showView.login);
page('/logout', preventAccess.allowOnlyLoggedUsers, showView.logout);
page('/create', preventAccess.allowOnlyLoggedUsers, showView.create);
page('/details/:furnitureId', showView.details);
page('/edit/:furnitureId', preventAccess.allowOnlyLoggedUsers, showView.edit);
page('/delete/:furnitureId', preventAccess.allowOnlyLoggedUsers, showView.delete);

page();