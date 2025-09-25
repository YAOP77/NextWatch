import axios from "axios";
import authHeader from "../../../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

const readAllCategory = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/movies`, {
            headers: authHeader()
        });
        return response.data
    } catch (error) {
        handleError(error);
    }
}

const handleError = (error) => {
    console.error("Erreur API :", error);
    throw error.response?.data || { message: "Erreur inconnu" }
};

export default {
    readAllCategory
};