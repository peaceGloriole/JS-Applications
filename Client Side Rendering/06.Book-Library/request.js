import { getUrl } from './urlStorage.js';

async function request(method, url, data) {
  const urlInfo = url;

  let options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(urlInfo, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

async function get(url) {
  const result = await request(`GET`, url);
  return result;
}

export {
  get
}

