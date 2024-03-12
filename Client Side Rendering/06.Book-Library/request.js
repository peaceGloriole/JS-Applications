async function request(method, url, data) {
  const option = {
    method
  }

  if(data) {
    option[`headers`] = { 'Content-Type': 'application/json' };
    option[`body`] = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, option);
    const result = await response.json();
    return result;
  } catch (error) {
    alert(error.message);
  }
}

async function get(url) {
  return request(`GET`, url);
}

async function post(url, data) {
  return request(`POST`, url, data);
}

async function update(url, id, data) {
  const updatedUrl = `${url}/${id}`;
  return request(`PUT`, updatedUrl, data);
}

export const dataApi = {
  get,
  post,
  update
}
