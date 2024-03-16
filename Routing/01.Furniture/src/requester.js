async function requester(method, url, data) {
  let options = {
    method,
    headers: {}
  }

  if (data) {
    options.headers[`Content-Type`] = `application/json`;
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    if(!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if(response.status == 204) {
      return response;
    }

    return await response.json();
  } catch (error) {
      alert(error.message);
      throw error;
  }
}

async function get(url) {
  return requester(`GET`, url);
}

async function post(url, data) {
  return  requester(`POST`, url, data);
}

async function put(url, data) {
  return  requester(`PUT`, url, data);
}

async function del(url) {
  return  requester(`DELETE`, url);
}

const api = {
  get,
  post,
  put,
  del
}