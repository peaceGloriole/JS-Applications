import { delEvent, getEventById } from '../data/events.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (item, hasUser, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
    <div>
        <img id="details-img" src=${item.imageUrl} alt="example1" />
        <p id="details-title">${item.item}</p>
    </div>
    <div id="info-wrapper">
        <div id="details-description">
        <p class="details-price">Price: ${item.price}</p>
        <p class="details-availability">
            ${item.availability}
        </p>
        <p class="type">Type: ${item.type}</p>
        <p id="item-description">
            ${item.description}
        </p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${hasUser ? html`
        <div id="action-buttons">
            ${isOwner ? html`
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} data-id=${item._id} href="" id="delete-btn">Delete</a>` : null}
        </div> ` : null}
    </div>
    </div>
</section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const event = await getEventById(id);

    const user = getUserData();
    const hasUser = !!user;
    const isOwner = hasUser && user._id == event._ownerId;

    render(detailsTemplate(event, hasUser, isOwner));
}

async function onDelete(e) {
    e.preventDefault();
    const isDel = confirm(`Are you sure you want to delete this motor?`);
    const id = e.target.dataset.id;
  
    if (!isDel) {
      return;
    }
  
    await delEvent(id);
    page.redirect(`/catalog`);
  }