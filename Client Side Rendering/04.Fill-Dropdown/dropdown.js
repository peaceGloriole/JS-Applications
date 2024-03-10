import { html, render } from '../node_modules/lit-html/lit-html.js';
import { post } from './request.js';
import { url } from './baseUrlInfo.js';

const inputButton = document.querySelector(`input[type="submit"]`);
inputButton.addEventListener(`click`, onSubmit);

const selectMenu = document.getElementById(`menu`);
const inputField = document.getElementById(`itemText`).textContent;

const template = (data) => html`
  ${data.map((item) => html`<option value=${item._id}>${item.text}</option>`)}
`;

onStart();

async function onStart() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    render(template(Object.values(data)), selectMenu);
  } catch (error) {
    alert(error.message);
  }
}

async function onSubmit(e) {
  e.preventDefault();

  try {
    const result = await post(url, { text: inputField });

    render(template(result), selectMenu);
    debugger
  } catch (error) {
    alert(error.message);
  }
}