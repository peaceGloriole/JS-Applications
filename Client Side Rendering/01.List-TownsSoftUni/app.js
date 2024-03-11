const form = document.querySelector(`form`).addEventListener(`submit`, onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const townsList = formData.get(`towns`).split(`, `);

}