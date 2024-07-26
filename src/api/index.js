const URL = "https://pixabay.com";

export const getImages = (searchVal) => {
    return fetch(`${URL}/api/?key=${import.meta.env.VITE_IMAGE_API_KEY}&q=${encodeURIComponent(searchVal)}`, {
        method: "GET"
    })
}
