import { api } from '../requester.js';

const BASE_url = `http://localhost:3030/`;
const endPoints = {
  register: `users/register`,
  login: `users/login`,
  logout: `users/logout`
}

async function login(data) {
  return await api.post(BASE_url + endPoints.login, data);
}

async function register(data) {
  return await api.post(BASE_url + endPoints.register, data);
}

async function logout() {
  return await api.get(BASE_url + endPoints.logout);
}

export const userService = {
  login,
  register,
  logout
}