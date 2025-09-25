import { createContext, useState, useEffect } from "react";
import adminMovieServices from "../services/adminMovieServices";

export const AdminMoviesContext = createContext();

const AdminMoviesProvider = ({ children }) => {
    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const readMovies = async (category = null) => {
        try {
            setLoading(true);
            const data = await adminMovieServices.SmartReadMovies(category || "Tous");
            setMovies(data);
            // console.log("Films récupérés :", data);
        } catch (error) {
            setError(error.message || "Erreur inconnu");
        } finally {
            setLoading(false)
        }
    }

    const addMovies = async (formData) => {
        try {
            setLoading(true);
            const data = await adminMovieServices.MoviesUpload(formData);
            setMovies((prev) => [...prev, data]);
        } catch (error) {
            setError(error.message || "erreur inconnu");
        } finally {
            setLoading(false)
        }
    }

    const updateMovies = async (id, formData) => {
        try {
            setLoading(true);
            const data = await adminMovieServices.MoviesUpdate(id, formData);
            setMovies(prev => prev.map(
                movie => movie._id === id ? data : movie
            ));
        } catch (error) {
            setError(error.message || "Erreur inconnu");
        } finally {
            setLoading(false)
        }
    }

    const deleteMovies = async (id) => {
        try {
            setLoading(true);
            const data = await adminMovieServices.deleteMovies(id);
            setMovies(prev => prev.filter(
                movie => movie._id !== id
            ));
        } catch (error) {
            setError(error.message || "Erreur inconnu");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        readMovies();
    }, []);

    return (
        <AdminMoviesContext.Provider value={{
            movies,
            loading,
            error,
            readMovies,
            addMovies,
            updateMovies,
            deleteMovies
        }}>
            { children }
        </AdminMoviesContext.Provider>
    )
}

export default AdminMoviesProvider;