import axios from "axios";
import authHeader from "../../../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

const UserSmartReadMovies = async (category = "Tous") => {
    try {
        const url = category === "Tous"
        ? `${API_URL}/user/movies/all`
        : `${API_URL}/user/movies/${encodeURIComponent(category)}`

        const response = await axios.get(url, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

const SearchQueryMovies = async (query) => {
    try {
        // console.log("Recherche :", query);
        const response = await axios.get(`${API_URL}/user/movies/search/query`, {
            params: { query },
            headers: authHeader()
        });
        // console.log("Résultats reçus :", response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const SearchPremiumMovies = async (query) => {
    try {
        // console.log(query)
        const response = await axios.get(`${API_URL}/user/movies/premium/search/query`, {
            params: { query },
            headers: authHeader()
        });

        return response.data;
    } catch (error) {
        
    }
}

const GetMoviesById = async (id) => {
    // if (!id) {
        //     console.warn("ID de film manquant ou invalide");
    //     return null;
    // }
    
    try {
        const response = await axios.get(`${API_URL}/user/movies/read/${String(id)}`, {
            headers: authHeader()
        });
        return response.data;

        // Vérifie que la réponse contient bien les données attendues
        // if (response && response.data) {
        //     return response.data;
        // } else {
        //     console.warn("Réponse vide ou inattendue du serveur");
        //     return null;
        // }
    } catch (error) {
        handleError(error);
        // return null;
    }
};

const PremiumMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/movies/read/${String(id)}`, {
            headers: authHeader()
        });
        return response.data;

    } catch (error) {
        handleError(error);
    }
};

// Afficher les films similaires à partir de l'ID du film
const GetSimilarMoviesById = async (movieId) => {
    try {
        const response = await axios.get(`${API_URL}/user/movies/similar/${movieId}`, {
            headers: authHeader()
        });
        // console.log("Données des films similaires :", response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const AllMoviesPremium = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/movies/premium/all`, {
            headers: authHeader()
        });
        // console.log("Premium :", response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const handleError = (error) => {
    console.error("Erreur API :", error);
    throw error.response?.data || { message: "Erreur inconnue" };
};

export default {
    UserSmartReadMovies,
    SearchQueryMovies,
    SearchPremiumMovies,
    GetMoviesById,
    PremiumMovieById,
    GetSimilarMoviesById,
    AllMoviesPremium
};