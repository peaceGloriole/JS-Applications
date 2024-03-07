import { register } from "../api/userService.js";

const registerSection = document.querySelector("div[data-view-name='register']");
const form = registerSection.querySelector("form").addEventListener(`submit`, onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { email, password, repeatPassword } = Object.fromEntries(formData);

  if(email.length < 3 || password.length < 3 || password !== repeatPassword) {
    return alert(`Register Error`);
  }

  register({ email, password });
}

export function showRegisterView(ctx) {
  ctx.render(registerSection);
}

