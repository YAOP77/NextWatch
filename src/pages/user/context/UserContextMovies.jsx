import { createContext, useState, useEffect } from "react";
import userMoviesService from "../services/userMoviesService";
import userFavorisService from "../services/userFavorisService";
import userWatchLater from "../services/userWatchLaterService";

export const UserMoviesContext = createContext();

const UserMoviesProvider = ({ children }) => {
    // Pour les films
    const [ movies, setMovies ] = useState([]);
    const [ moviesPremium, setMoviesPremium ] = useState([]);
    // Pour l'id du film
    // const [ movie, setMovie ] = useState(null);
    const [ favoris, setFavoris ] = useState([]);
    const [ watchLater, setWatchLater ] = useState([]);
    const [ movieId, setMovieId ] = useState({});
    const [ similarMovies, setSimilarMovies ] = useState([]);

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // const getMovieById = async (id) => {
    //     try {
    //         const data = await userMoviesService.GetMoviesById(id);
    //         return setMovie(data);
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };

    const ReadSimilarMovies = async (movieId) => {
        try {
            const data = await userMoviesService.GetSimilarMoviesById(movieId);
            return setSimilarMovies(data || []);
        } catch (error) {
            setError(error.message);
        }
    }

    const readAllWatchLater = async () => {
        try {
            const data = await userWatchLater.readWatchLater();
            setWatchLater(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const addOrRemoveWatchLater = async (movieId) => {
        try {
            const data = await userWatchLater.addOrRemoveWatchLater(movieId);
            const updateWatchLater = await userWatchLater.readWatchLater();
            setWatchLater(updateWatchLater);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getFavoris = async () => {
        try {
            const data = await userFavorisService.GetFavorisByUser();
            setFavoris(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const addOrDeleteFavoris = async (movieId) => {
        try {
            // Toggle favoris côté backend
            await userFavorisService.HandleSmartFavoris(movieId);            
            // Re-fetch pour synchroniser l'état avec la DB
            const updatedFavoris = await userFavorisService.GetFavorisByUser();
            setFavoris(updatedFavoris);
            // console.log("Favoris mis à jour :", updatedFavoris);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const userReadMovies = async (category = "Tous") => {
        try {
            const data = await userMoviesService.UserSmartReadMovies(category || "Tous");
            setMovies(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const getMoviesPremium = async () => {
        try {
            const data = await userMoviesService.AllMoviesPremium();
            setMoviesPremium(data || []);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        userReadMovies();
    }, [setMovies]);

    useEffect(() => {
        getMoviesPremium();
    }, [setMoviesPremium]);

    useEffect(() => {
        getFavoris();
        readAllWatchLater();
    }, []);

    return (
        <UserMoviesContext.Provider value={{
            movies,
            loading,
            error,
            favoris,
            userReadMovies,
            addOrDeleteFavoris,
            getFavoris,
            watchLater,
            addOrRemoveWatchLater,
            readAllWatchLater,
            movieId,
            similarMovies,
            ReadSimilarMovies,
            getMoviesPremium,
            moviesPremium
        }}>
            { children }
        </UserMoviesContext.Provider>
    )
}

export default UserMoviesProvider;