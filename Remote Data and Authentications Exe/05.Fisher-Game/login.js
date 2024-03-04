import { createOption } from "./register.js";
document.querySelector(`form`).addEventListener(`submit`, onLogin);
document.querySelector(`a[id="logout"]`).style.display = `none`;
document.querySelector(`a[id="login"]`).classList.add(`active`);
document.querySelector(`a[id="register"]`).classList.remove(`active`);
const loginUrl = `http://localhost:3030/users/login`;

async function onLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get(`email`);
  const password = formData.get(`password`);

  if (!email || !password) {
    return; //TODO: error handling
  }

  await loginUser({ email, password });
  e.target.reset();
  window.location = `index.html`;
}

async function loginUser(data) {
  const option = createOption(`POST`, data);
  const response = await fetch(loginUrl, option);
  const userData = await response.json();
  sessionStorage.setItem(`userData`, JSON.stringify(userData));
}