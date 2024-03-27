import { getAllEvents } from '../data/events.js';
import { html, render } from '../lib.js';

const catalogTemplate = (data) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
    ${data.length ? data.map(eventTemplate) : html`
    <h2 class="no-avaliable">No available motorcycles yet.</h2>`}
</section>`;

const eventTemplate = (event) => html`
<div class="motorcycle">
    <img src=${event.imageUrl} alt="example1" />
    <h3 class="model">${event.model}</h3>
    <p class="year">Year: ${event.year}</p>
    <p class="mileage">Mileage: ${event.mileage} km.</p>
    <p class="contact">Contact Number: ${event.contact}</p>
    <a class="details-btn" href="/details/${event._id}">More Info</a>
</div>`;

export async function showCatalog(ctx) {
    const events = await getAllEvents();
    render(catalogTemplate(events));
}