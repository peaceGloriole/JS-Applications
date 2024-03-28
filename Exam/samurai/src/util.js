function setUserData(data) {
  localStorage.setItem(`userData`, JSON.stringify(data));
}

function getUserData() {
  return JSON.parse(localStorage.getItem(`userData`));
}

function clearUserData() {
  localStorage.removeItem(`userData`);
}

function isOwner(itemOwnerId) {
  return getUserData()?._id === itemOwnerId;
}

function createSubmitHandler(callback) {
  return function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

    callback(Object.fromEntries(data), e.target);
  };
}

function updateNav() {
  const userData = getUserData();

  document.querySelector(`nav .user`).style.display = userData ? `block` : `none`;
  document.querySelector(`nav .guest`).style.display = userData ? `none` : `block`;
}

export {
  setUserData,
  getUserData,
  clearUserData,
  createSubmitHandler,
  updateNav,
  isOwner
};