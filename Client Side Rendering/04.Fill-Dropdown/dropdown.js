import { html, render } from '../node_modules/lit-html/lit-html.js';
import { post, get } from './request.js';
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
    // Make the POST request to add a new item
    const result = await post(url, { text: inputField });

    // Make a GET request to fetch the updated data
    const newData = await get(url);

    // Render the template with the updated data
    render(template(newData), selectMenu);

  } catch (error) {
    alert(`Error in onSubmit: ${error.message}`);
  }
}