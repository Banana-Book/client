import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL
});

export const setToken = (token) => {
    const tokenValue = window.localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || token;
    instance.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;
}

export default instance;
