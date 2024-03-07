function getUser() {
  return JSON.parse(sessionStorage.getItem('userData'));
}

function hasUser() {
  return !!getUser();
}

function removeUser() {
  sessionStorage.removeItem('userData');
}

export {
  getUser,
  hasUser,
  removeUser
}