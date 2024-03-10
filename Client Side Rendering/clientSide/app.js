import { html, render } from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';

const root = document.getElementById(`contacts`);
root.addEventListener(`click`, onClick);

const cardTemplate = (contacts) => html`
<div class="contact card">
    <div>
       <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
      <h2>Name: ${contacts.name}</h2>
      <button class="detailsBtn">Details</button>
          <div class="details" id="${contacts.id}">
             <p>Phone number: ${contacts.phoneNumber}</p>
             <p>Email: ${contacts.email}</p>
          </div>
    </div>
</div>`;

render(contacts.map(cardTemplate), root);

function onClick(event) {
  if(event.target.classList.contains(`detailsBtn`)) {
    const details = event.target.parentElement.querySelector(`.details`);
    const isHidden = details.style.display === `none`;
    details.style.display = isHidden ? `block` : `none`;
  }
}