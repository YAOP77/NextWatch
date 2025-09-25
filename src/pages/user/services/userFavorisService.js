import axios from "axios";
import authHeader from "../../../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

const HandleSmartFavoris = async (movieId) => {
    try {
        const response = await axios.post(`${API_URL}/user/favoris`, { movieId }, {
            headers: authHeader()
        });
        // console.log("movieId envoyé :", movieId);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const GetFavorisByUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/favoris/all`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Erreur API GetFavorisByUser:", error);
    throw new Error(error.response?.data?.error || "Erreur inconnue");
  }
};

const handleError = (error) => {
    console.error("Erreur API" ,error);
    throw error.response?.data || { message: "Erreur inconnu" }
};

export default {
    HandleSmartFavoris,
    GetFavorisByUser
};