import { register } from '../data/users.js';
import { html, render, page } from '../lib.js';
import { createSubmitHandler, updateNav } from '../util.js';

const registerTemplate = (onRegister) => html`
<section id="register">
    <div class="form">
    <h2>Register</h2>
    <form class="register-form" @submit=${onRegister}>
        <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"/>
        <input
            type="password"
            name="password"
            id="register-password"
            placeholder="password"/>
        <input
            type="password"
            name="re-password"
            id="repeat-password"
            placeholder="repeat password"/>
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    </div>
</section>`;

export function showRegister(ctx) {
    render(registerTemplate(createSubmitHandler(onRegister)));
}

async function onRegister(data, form) {
    const email = data.email.trim();
    const password = data.password.trim();
    const rePass = data[`re-password`].trim();
    
    if(!email || !password || !rePass){
        return alert(`All fields are required!`);
    }

    if(password != rePass){
        return alert(`Passwords don't match`);
    }

    await register(email, password);
    updateNav(); 
    page.redirect(`/`);
}