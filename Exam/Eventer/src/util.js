function setUserData(data) {
  localStorage.setItem(`user`, JSON.stringify(data));
}

function getUserData() {
  return JSON.parse(localStorage.getItem(`user`));
}

function clearUserData() {
  localStorage.removeItem(`user`);
}

function createSubmitHandler(callback) {
  return function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

    callback(Object.fromEntries(data), e.target);
  };
}

export {
  setUserData,
  getUserData,
  clearUserData
};