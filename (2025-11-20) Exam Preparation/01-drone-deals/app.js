import page from './node_modules/page/page.mjs';
import { preventAccess } from './utilities/prevent-access.js';
import { showView } from './views/show-view.js';

page('*', (context, next) => {
    context.headerContainer = document.getElementById('header-element');
    context.mainContainer = document.getElementById('main-element');

    showView.header(context);

    next();
});

page('/', showView.homepage);
page('/marketplace', showView.marketplace)
page('/register', preventAccess.allowOnlyGuestUsers, showView.register);
page('/login', preventAccess.allowOnlyGuestUsers, showView.login);
page('/logout', preventAccess.allowOnlyLoggedUsers, showView.logout);
page('/sell', preventAccess.allowOnlyLoggedUsers, showView.sell);
page('/details/:droneId', showView.details);
page('/edit/:droneId', preventAccess.allowOnlyLoggedUsers, showView.edit);
page('/delete/:droneId', preventAccess.allowOnlyLoggedUsers, showView.delete);

page();