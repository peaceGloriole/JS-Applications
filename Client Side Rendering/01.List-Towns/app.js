import { html, render } from '../node_modules/lit-html/lit-html.js';

document.getElementById(`btnLoadTowns`).addEventListener(`click`, onLoad);

const root = document.getElementById(`root`);

const townsTemplate = (towns) => html`
<ul>
  ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`;

function onLoad(e) {
  e.preventDefault();
  let inputFields = document.getElementById(`towns`).value;
  let townsArray = inputFields.split(`, `);

  render(townsTemplate(townsArray), root);
}