function setUserData(userData) {
  localStorage.setItem(`userData`, JSON.stringify(userData));
}

function getUserData() {
  return JSON.parse(localStorage.getItem(`userData`));
}

function removeUserData() {
  localStorage.removeItem(`userData`);
}

function getUserToken() {
  const userData = getUserData();
  return userData.accessToken;
}

function getUserId() {
  const userData = getUserData();
  return userData._id;
}

function hasOwner(ownerId) {
  const id = getUserData();
  return ownerId == id;
}

const userHelper = {
  setUserData,
  getUserData,
  removeUserData,
  getUserToken,
  getUserId,
  hasOwner
};