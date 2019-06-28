function setItem(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
}

function getItem(key) {
    return JSON.parse(window.sessionStorage.getItem(key)) || [];
}

export {
    setItem,
    getItem
}