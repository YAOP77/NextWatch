import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // console.log("Token récupéré :", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log("En-tête Authorization ajouté :", config.headers.Authorization);
    }
    return config;
});

export default API;