function setUserData(data) {
    localStorage.setItem(`userData`, JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(localStorage.getItem(`userData`));
}

function clearUserData() {
    localStorage.removeItem(`userData`);
}

function createSubmitHandler(callback) {
    return function(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        callback(Object.fromEntries(data), e.target);
    };
}

export {
    setUserData,
    getUserData,
    clearUserData,
    createSubmitHandler
};