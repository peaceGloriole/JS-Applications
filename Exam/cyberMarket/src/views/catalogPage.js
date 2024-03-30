import { getAllEvents } from '../data/events.js';
import { html, render } from '../lib.js';

const catalogTemplate = (data) => html`
<h3 class="heading">Market</h3>
    <section id="dashboard">
        ${data.length ? data.map(eventTemplate) : html`<h3 class="empty">No Items Yet</h3>`};
    </section>`;

const eventTemplate = (event, id) => html`
<div class="item">
        <img src=${event.imageUrl} alt="example1" />
        <h3 class="model">${event.item}</h3>
        <div class="item-info">
          <p class="price">Price: ${event.price}</p>
          <p class="availability">
            ${event.availability}
          </p>
          <p class="type">Type: ${event.type}</p>
        </div>
        <a class="details-btn" href="/catalog/${event._id}">Uncover More</a>
      </div>`;

export async function showCatalog(ctx) {

    const events = await getAllEvents();
    render(catalogTemplate(events));
}