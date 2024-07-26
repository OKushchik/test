export const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export const getParseFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}
