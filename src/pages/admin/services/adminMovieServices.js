import axios from "axios";
import authHeader  from "../../../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

const MoviesUpload = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/movies/uploads`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
              ...authHeader(),
          }
        });
        return response.data;
    } catch (error) {
        handleError(error);
        // Pour que le composant sache aussi gérer
        throw error;
    }
};

const SmartReadMovies = async (category = "Tous") => {
    try {        
        const url = category === "Tous"
        ? `${API_URL}/movies/admin/all`
        : `${API_URL}/movies/category/${encodeURIComponent(category)}`;
    
        const response = await axios.get(url, {
            headers: authHeader()
        });
    
        return response.data; 
    } catch (error) {
        handleError(error);
        throw error;
    }
}


const MoviesUpdate = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/movies/${id}`, formData, {
            headers: { 
                "Content-type": "multipart/form-data",
                ...authHeader(),
            }
        })
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

const MoviesDelete = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/movies/${id}`, {
            headers: authHeader()
        })
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

const handleError = (error) => {
    console.error("Erreur API :", error);
    throw error.response?.data || { message: "Une erreur est survenue" };
};

export default { 
    MoviesUpload,
    SmartReadMovies,
    MoviesUpdate,
    MoviesDelete
};