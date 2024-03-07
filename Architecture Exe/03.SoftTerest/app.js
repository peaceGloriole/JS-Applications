import { hasUser } from "./src/utils/userUtils.js";
import { showRegisterView } from "./src/views/registerView.js";


document.querySelectorAll("div[data-selection='section']").forEach(div => div.remove());

const main = document.querySelector(`main`);
const nav = document.querySelector('nav');
nav.addEventListener(`click`, onNavigate);
updateNav();

const routes = {
  "/": () => console.error(`home`),
  "/home": () => console.error(`home`),
  "/dashboard": () => console.error(`dashboard`),
  "/create": () => console.error(`create`),
  "/login": () => console.error(`login`),
  "/register": showRegisterView,
  "/details": () => console.error(`details`),
  "/logout": () => console.error(`logout`),
  "*": () => console.error(`404 Page not found`)
};

function updateNav() {
  const isUserExist = hasUser();

  const guestAnchor = document.querySelectorAll("a[data-permission='guest']");
  const userAnchor = document.querySelectorAll("a[data-permission='user']");

  if (isUserExist) {
    guestAnchor.forEach(a => a.style.display = `none`);
    userAnchor.forEach(a => a.style.display = `block`);
  } else {
    guestAnchor.forEach(a => a.style.display = `block`);
    userAnchor.forEach(a => a.style.display = `none`);
  }
}

function renderer(view) {
  main.replacechildren(view);
}

function onNavigate(e) {
  e.preventDefault();
  let element = e.target;

  if (e.target.tagName !== 'A' && e.target.tagName !== `IMG`) {
    return;
  }

  if (e.target.tagName == `IMG`) {
    element = e.target.parentElement;
  }

  const viewName = new URL(element.href).pathname;
  goTo(viewName);
}

let ctx = {
  render: renderer
};

function goTo(name) {
  const handler = routes[name];

  if (typeof(handler) !== "function") {
    return routes["*"]();
  }

  handler(ctx);
}