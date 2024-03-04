let userData = JSON.parse(sessionStorage.getItem(`userData`));

document.querySelector(`a[id="home"]`).classList.add(`active`);
document.getElementById(`logout`).addEventListener(`click`, onLogout);
document.querySelector(`.load`).addEventListener(`click`, onLoad);
document.getElementById(`addForm`).addEventListener(`submit`, onCreate);


const userDiv = document.getElementById(`user`);
const guestDiv = document.getElementById(`guest`);
const addBtnRef = document.querySelector(`.add`);
const catchesRef = document.getElementById(`catches`);

const url = {
  logout: `http://localhost:3030/users/logout`,
  catches: `http://localhost:3030/data/catches`
}

function hasOwner(id) {
  return userData?._id === id;
}

updateNav();

function updateNav() {
  if (userData) {
    document.querySelector(`nav p span`).textContent = `${userData.email}`;
    userDiv.style.display = `inline-block`;
    guestDiv.style.display = `none`;
    addBtnRef.disabled = false;
  } else {
    document.querySelector(`nav p span`).textContent = `guest`;
    guestDiv.style.display = `inline-block`;
    userDiv.style.display = `none`;
    document.querySelector(`a[id="logout"]`).style.display = `none`;
    addBtnRef.disabled = true;
  }
}

async function onLogout(e) {
  let option = {
    method: `GET`,
    headers: {
      'X-Authorization': userData.accessToken
    }
  }

  await fetch(url.logout, option);

  sessionStorage.clear();
  userData = null;
  await onLoad();
  updateNav();
}

async function onLoad() {
  const response = await fetch(url.catches);
  const data = await response.json();

  catchesRef.innerHTML = ``;

  data.forEach(x => {
    let div = allCatches(x)
    catchesRef.appendChild(div);
  });
}

function allCatches(data) {
  let isOwner = hasOwner(data._ownerId);
  let div = document.createElement(`div`);
  div.classList.add(`catch`);

  div.innerHTML += `<label>Angler></label>`
  div.innerHTML += `<input type="text" class="angler" ${!isOwner} ? "disabled" : "" value=${data.angler}>`
  div.innerHTML += `<label>Weight></label>`
  div.innerHTML += `<input type="text" class="weight" ${!isOwner} ? "disabled" : "" value=${data.weight}>`
  div.innerHTML += `<label>Species></label>`
  div.innerHTML += `<input type="text" class="species" ${!isOwner} ? "disabled" : "" value=${data.species}>`
  div.innerHTML += `<label>Location></label>`
  div.innerHTML += `<input type="text" class="location" ${!isOwner} ? "disabled" : "" value=${data.location}>`
  div.innerHTML += `<label>Bait></label>`
  div.innerHTML += `<input type="text" class="bait" ${!isOwner} ? "disabled" : "" value=${data.bait}>`
  div.innerHTML += `<label>Capture Time></label>`
  div.innerHTML += `<input type="text" class="captureTime" ${!isOwner} ? "disabled" : "" value=${data.captureTime}>`

  const updateBtn = document.createElement(`button`);
  updateBtn.classList.add(`update`);
  updateBtn.dataset.id = data._id;
  updateBtn.textContent = `Update`;
  const deleteBtn = document.createElement(`button`);
  deleteBtn.classList.add(`delete`);
  deleteBtn.dataset.id = data._id;
  deleteBtn.textContent = `Delete`;

  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);

  if (!hasOwner(data._ownerId)) {
    updateBtn.disabled = true;
    deleteBtn.disabled = true;
  }

  updateBtn.addEventListener(`click`, onUpdate);
  deleteBtn.addEventListener(`click`, onDelete);

  return div;
}

async function onCreate(e) {
  e.preventDefault();

  let formData = new FormData(e.target);

  let angler = formData.get(`angler`);
  let weight = formData.get(`weight`);
  let species = formData.get(`species`);
  let location = formData.get(`location`);
  let bait = formData.get(`bait`);
  let captureTime = formData.get(`captureTime`);
  let _ownerId = userData._id;

  if (!angler || !weight || !species || !location || !bait || !captureTime) {
    return; //TODO: error handling
  }

  let data = {
    angler,
    weight,
    species,
    location,
    bait,
    captureTime,
    _ownerId
  }

  const option = createOption(`POST`, data);

  await fetch(url.catches, option);
  onLoad();
}

function onUpdate(e) {

}

async function onDelete(e) {
  const id = e.target.dataset.id;
  const option = {
    method: "DELETE",
    headers: {
      'X-Authorization': userData.accessToken
    }
  }
  await fetch(url.catches + "/" + id, option);
  onLoad();
}

function createOption(method, data) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.accessToken
    },
    body: JSON.stringify(data)
  }
}