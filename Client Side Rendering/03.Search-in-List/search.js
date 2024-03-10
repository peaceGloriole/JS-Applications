import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const divId = document.getElementById('towns');
const input = document.getElementById('searchText');
const resultDiv = document.getElementById('result');

const townTemplate = (town) => html`
  <li>${town}</li>
`;

const renderTowns = (towns) => {
  const townList = html`<ul>${towns.map(town => townTemplate(town))}</ul>`;
  render(townList, divId);
};

renderTowns(towns);

document.querySelector('button').addEventListener('click', () => {
  const searchText = input.value.toLowerCase();
  const filteredTowns = towns.filter(town => town.toLowerCase().includes(searchText));
  renderTowns(filteredTowns);

  resultDiv.textContent = `${filteredTowns.length} result(s) found`;
});
