import { delEvent, getEventById } from '../data/events.js';
import { html, render, page } from '../lib.js';
import { isOwner } from '../util.js';

const detailsTemplate = (item, hasOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${item.year}</p>
                <p class="mileage">Mileage: ${item.mileage} km.</p>
                <p class="contact">Contact Number: ${item.contact}</p>
                   <p id = "motorcycle-description">
                    ${item.about}
                        </p>
              </div>
               <!--Edit and Delete are only for creator-->
            ${hasOwner ? html`
            <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} data-id=${item._id} href="" id="delete-btn">Delete</a>
          </div>
          ` : ``}
            </div>
        </div>
      </section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const event = await getEventById(id);
  const hasOwner = isOwner(event._ownerId);

  render(detailsTemplate(event, hasOwner));
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