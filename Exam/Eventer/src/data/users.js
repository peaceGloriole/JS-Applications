import { setUserData, clearUserData } from '../util.js';
import { post, get } from './request.js';

const endPoints = {
    login: `/users/login`,
    register: `/users/register`,
    logout: `/users/logout`,
};

async function login(email, password) {
    const result = await post(endPoints.login, { email, password });
    setUserData(result);
}

async function register(email, password) {
    const result = await post(endPoints.register, { email, password });
    setUserData(result);
}

async function logout() {
    const promise = get(endPoints.logout);
    clearUserData();

    await promise;
}

export {
    login,
    register,
    logout
};