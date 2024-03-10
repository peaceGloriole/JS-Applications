import { cats } from './catSeeder.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const section = document.getElementById('allCats');

const catTemplate = (cat) => html`
    <li>
      <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
      <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
          <h4>Status Code: ${cat.statusCode}</h4>
          <p>${cat.statusMessage}</p>
        </div>
      </div>
    </li>
`;

const catList = html`<ul>${cats.map(cat => catTemplate(cat))}</ul>`;

render(catList, section);

const showBtns = document.querySelectorAll('.showBtn');
showBtns.forEach(btn => btn.addEventListener('click', showInfo));

function showInfo(e) {
  e.preventDefault();

  const element = e.target.parentElement;
  const statusElement = element.querySelector('.status');
  statusElement.style.display = (statusElement.style.display === 'none') ? 'block' : 'none';
  e.target.textContent = (statusElement.style.display === 'none') ? 'Show status code' : 'Hide status code';
}
