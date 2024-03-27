import { getEventById } from '../data/events.js';
import { html, render } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (item) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="../../${item.imgUrl}" alt="example1" />
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
          <div id="action-buttons">
            <a href="" id="edit-btn">Edit</a>
            <a href="" id="delete-btn">Delete</a>
          </div>
            </div>
        </div>
      </section>`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const event = await getEventById(id);

    render(detailsTemplate(event));
}