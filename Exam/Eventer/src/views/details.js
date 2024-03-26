import { getEventsById } from '../data/events.js';
import { html, render } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (item, hasUser, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt="example1" />
      <p id="details-title">${item.name}</p>
      <p id="details-category">
        Category: <span id="categories">${item.category}</span>
      </p>
      <p id="details-date">
        Date:<span id="date">${item.date}</span></p>
      <div id="info-wrapper">
        <div id="details-description">
          <span>
            ${item.description}</span>
        </div>

      </div>

    <h3>Going: <span id="go">0</span> times.</h3>
    <!--Edit and Delete are only for creator-->
    ${hasUser ? html`
    <div id="action-buttons">
        ${isOwner ? html`
              <a href="/edit${item._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn">Delete</a>` : html`
              <a href="javascript:void(0)" id="go-btn">Going</a>` }
            </div>` : null}
          </div>
</section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const event = await getEventsById(id);

    const user = getUserData();
    const hasUser = !!user;
    const isOwner = hasUser && user._id == event._ownerId;

    render(detailsTemplate(event, hasUser, isOwner));
}