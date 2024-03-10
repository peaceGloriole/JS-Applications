import { post } from './requester.js';

const endPoints = {
  register: `users/register`
}

async function register(data) {
  return await post(endPoints.register , data);
}

export {
  register
}