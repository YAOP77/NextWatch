// import API from "../../../services/securedAxios";
import axios from "axios";
import authHeader from "../../../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

const addOrRemoveWatchLater = async (movieId) => {
    try {
        const response = await axios.post(`${API_URL}/user/later/add`, { movieId }, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const readWatchLater = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/later`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const handleError = (error) => {
    console.error("Erreur readWatchLater :", error);
    throw error.response?.data || { message: "Erreur inconnu" };
}

export default { addOrRemoveWatchLater, readWatchLater };