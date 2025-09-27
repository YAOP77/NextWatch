import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import userMoviesService from "./services/userMoviesService";
import SimilarMovies from "./components/SimilarMovies";
import CardPayement from "./components/CardPayement";
import Loader from "../../components/loader/loader";
import { Play } from 'lucide-react';
import Button from '../../components/Button';
import { VideoInfoIcons } from '../../components/VideoInfoIcons';

const MoviesPremiumDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isWatching, setIsWatching] = useState(false);

    // récupère user connecté
    const { user } = useAuth();

    const userReadMovieById = async (movieId) => {
        try {
            const data = await userMoviesService.PremiumMovieById(movieId);
            setMovie(data);
        } catch (err) {
            if (err.response?.status === 403) {
                // L’utilisateur n’a pas d’abo
                document.getElementById("abo")?.scrollIntoView({ behavior: "smooth" });
            } else {
                setError(err.message);
            }
        }
    };

    useEffect(() => {
        if (id) {
            userReadMovieById(id);
        }
    }, [id]);

    if (error) return <div className="text-red-500">Erreur : {error}</div>;
    if (!movie) return <div className="text-white"><Loader /></div>;

    // Vérification de l’abonnement actif
    const hasActiveSubscription = () => {
        if (!user?.subscription || user.subscription === "free") return false;
        if (!user?.subscriptionEnd) return false;
        // abo encore valide
        return new Date(user.subscriptionEnd) > new Date();
    };

    const handleWatch = () => {
        if (movie.isPremium && (!hasActiveSubscription() || movie.restricted)) {
            // Scroll vers abo
            document.getElementById("abo")?.scrollIntoView({ behavior: "smooth" });
        } else {
            setIsWatching(true);
        }
    };

    const MovieRating = ({ rating }) => (
        <div className="flex gap-1">
            {[...Array(rating)].map((_, index) => (
                <FaStar key={index} color="#fff700" />
            ))}
        </div>
    );

    return (
        <div className="bg-black min-h-screen px-0 py-8">
            <main className="w-full max-w-9xl mx-auto px-4 sm:px-8">
            <div className="w-full flex flex-col items-center">
                <Button />
            </div>
            <div className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] m-auto overflow-hidden rounded-lg">
                {/* Image ou Vidéo */}
                {!isWatching ? (
                    <>
                        <img
                            src={movie.thumbnailsUrl}
                            alt={`Affiche de ${movie.title}`}
                            className="w-full h-full object-cover transition-opacity duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
                        <h2 className="absolute top-4 left-4 text-white font-bold text-left text-2xl sm:text-4xl z-10">
                            {movie.title}
                        </h2>
                        {movie.isPremium && movie.restricted ? (
                            <a
                                href="#subscription"
                                className="absolute bottom-4 left-4 flex items-center gap-2 text-lg text-white bg-red-700
                                px-5 py-3 rounded-lg hover:opacity-80 font-bold cursor-pointer z-10"
                            >
                                Choisir une offre
                            </a>
                        ) : (
                            <button
                                onClick={handleWatch}
                                className="absolute bottom-4 left-4 flex items-center gap-2 text-lg text-white bg-neutral-950
                                px-5 py-3 rounded-lg hover:opacity-75 font-bold cursor-pointer z-10"
                            >
                                Regarder <Play size={17} color="#ffce00" strokeWidth={1.75} />
                            </button>
                        )}
                    </>
                ) : (
                    <video
                        src={movie.moviesUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-cover rounded-lg"
                    />
                )}
            </div>

            {/* Détails */}
            <div className="flex flex-col max-w-5xl mx-auto mt-8">
                <h3 className="text-left text-red-800 mask-linear-from-red-800 text-2xl sm:text-5xl font-bold mb-4">Détails</h3>
                <h2 className="text-left mt-5 text-neutral-400 font-bold text-1xl sm:text-2xl">
                    {movie.title}
                </h2>
                <p className="text-neutral-500 text-left text-sm sm:text-base mt-2 leading-relaxed">
                    {movie.description}
                </p>
                <VideoInfoIcons movie={movie} />
            </div>

            <div className="mt-16 border-t border-neutral-800">
                <SimilarMovies 
                    movieId={movie._id} 
                    category={movie.category?.nom}   
                />
            </div>

            {/* Section paiement avec ID "subscription" */}
            <div id="subscription" className="mt-16">
                <CardPayement />
            </div>
            </main>
        </div>
    );
};

export default MoviesPremiumDetails;