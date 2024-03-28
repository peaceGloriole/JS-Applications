import { logout } from './data/users.js';
import { page } from './lib.js';
import { updateNav } from './util.js';
import { showCatalog } from './views/catalogPage.js';
import { showCreate } from './views/createPage.js';
import { showDetails } from './views/detailsPage.js';
import { showEdit } from './views/editPage.js';
import { showHome } from './views/homePage.js';
import { showLogin } from './views/loginPage.js';
import { showRegister } from './views/registerPage.js';
import { searchView } from './views/searchView.js';

updateNav();

page(`/`, showHome);
page(`/login`, showLogin);
page(`/register`, showRegister);
page(`/catalog`, showCatalog);
page(`/create`, showCreate);
page(`/details/:id`, showDetails);
page(`/edit/:id`, showEdit);
page(`/search`, searchView);

page.start();

document.getElementById(`logoutBtn`).addEventListener(`click`, async () => {
  logout();
  updateNav();
  page.redirect(`/`);
});