import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const root = document.getElementById('allCats');

render(createCatList(cats), root);

function createCatList(cat) {
  return html`
    <ul>
      ${cats.map(cat => createCat(cat))} 
    </ul>
  `;
}

function createCat(cat) {
  return html`
    <li>
      <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
      <div class="info">
        <button @click=${toggleCat} class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="100">
          <h4>Status Code: ${cat.statusCode}</h4>
          <p>${cat.statusMessage}</p>
        </div>
      </div>
    </li>
  `;
}

function toggleCat(e) {
  const statusDiv = e.target.parentElement.querySelector(`div`);
  const currState = statusDiv.style.display;

  if (currState === 'none') {
    statusDiv.style.display = 'block';
    e.target.textContent = `Hide status code`;
  } else {
    statusDiv.style.display = 'none';
    e.target.textContent = `Show status code`;
  }
}