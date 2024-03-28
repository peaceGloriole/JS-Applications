import { searchEvent } from '../data/events.js';
import { html, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const searchTemplate = (handler, result) => html`
<section id="search">
    <div class="form">
      <h4>Search</h4>
      <form @submit=${handler} class="search-form">
        <input
          type="text"
          name="search"
          id="search-input"
        />
        <button class="button-list">Search</button>
      </form>
    </div>
    <h4 id="result-heading">Results:</h4>
		${result ? showResultTemplate(result) : ``}
</section>`;

const showResultTemplate = (result) => html`
<div class="search-result">
${result ? result.map(x => html`
<div class="motorcycle">
	<img src=${x.imageUrl} alt="example1" />
  <h3 class="model">${x.model}</h3>
    <a class="details-btn" href="/details/${x._id}">More Info</a>
</div> `)
	 : html`
			<h2 class="no-avaliable">No result.</h2>
	`}

</div>`;

export function searchView() {
	 const handler = createSubmitHandler(onSearch);

	 render(searchTemplate(handler));
}

async function onSearch(data, form) {
	 const { search } = data;

	 const result = await searchEvent(search);
	 const handler = createSubmitHandler(onSearch);
	 render(searchTemplate(handler, result));
}