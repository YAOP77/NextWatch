import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userMoviesService from "../services/userMoviesService";
import UserMoviesCard from "./UserMovieCard";

const SimilarMovies = ({ movieId, category }) => {
    const [similar, setSimilar] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const data = await userMoviesService.GetSimilarMoviesById(movieId, category);
                setSimilar(data);
            } catch (err) {
                console.error("Erreur lors du chargement des films similaires :", err);
            }
        };
        if (movieId && category) {
            fetchSimilar();
        }
    }, [movieId, category]);

    const handleSelect = (movie) => {
        navigate(`/movies/${movie._id}`);
    };

    return (
        <div className="mt-12 max-w-5xl mx-auto">
            <h3 className="text-left text-red-800 mask-linear-from-red-800 text-2xl sm:text-4xl font-bold mb-10">Vous aimerez sûrement</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scroll-snap-x snap-x">
                {similar.map((sim) => (
                    <div key={sim._id} className="min-w-[200px] snap-start">
                        <UserMoviesCard movie={sim} onSelect={handleSelect} showFavoriteIcon={false} showWatchLaterIcon={false} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarMovies;