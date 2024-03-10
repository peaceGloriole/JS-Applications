import { url } from './baseUrlInfo.js';

async function request(method, url, data) {
  const mainUrl = url;

  const options = {
    method,
    headers: {}
  };

  if(data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(mainUrl, options);
    const result = await response.json();
    return result;
  } catch (error) {
    alert(error.message);
  }
}

async function post(url, data) {
  return await request(`POST`, url, data);
}

export {
  post
}