import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const root = document.querySelector(`div[data-id="root"]`);
const userNav = document.getElementById(`user`);
const guestNav = document.getElementById(`guest`);

page("/", ()=>console.log(`home`));
page("/dashboard", ()=>console.log(`dashboard`));
page("/create", ()=>console.log(`create`));
page("/details/:id", ()=>console.log(`details`));
page("/edit/:id", ()=>console.log(`edit`));
page("/login", ()=>console.log(`login`));
page("/register", ()=>console.log(`register`));
page("/my-furniture", ()=>console.log(`my-furniture`));
page("/logout", ()=>console.log(`logout`));

page.start();