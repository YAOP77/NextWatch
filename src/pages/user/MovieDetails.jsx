import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Footer from "../../components/Footer";
import Loader from "../../components/loader/loader";
// import UserSidebare from "./components/UserSidebar";
import userMoviesService from "./services/userMoviesService";
import SimilarMovies from "./components/SimilarMovies";
import CardPayement from "./components/CardPayement";
import { Play, Bookmark, ClockFading } from 'lucide-react';
import favorisService from "./services/userFavorisService";
import watchLaterService from "./services/userWatchLaterService";
import Button from '../../components/Button';
import { VideoInfoIcons } from '../../components/VideoInfoIcons';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isWatching, setIsWatching] = useState(false);
    const [isFavoris, setIsFavoris] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    // Simule la gestion favoris et watch later (à remplacer par API réelle)
    const handleToggleFavorite = async (movieId) => {
        try {
            await favorisService.HandleSmartFavoris(movieId);
            setIsFavoris((prev) => !prev);
        } catch (e) {}
    };
    const handleToggleWatchLater = async (movieId) => {
        try {
            await watchLaterService.addOrRemoveWatchLater(movieId);
            setIsWatchLater((prev) => !prev);
        } catch (e) {}
    };

    const userReadMovieById = async (movieId) => {
        try {
            const data = await userMoviesService.GetMoviesById(movieId);
            setMovie(data);
            // Trace du rating récupéré
            console.log("[MovieDetails] rating reçu:", data?.rating, "type:", typeof data?.rating);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (id) {
            userReadMovieById(id);
        }
    }, [id]);

    if (error) return <div className="text-red-500">Erreur : {error}</div>;
    if (!movie) return <div className="text-white"><Loader /></div>;

    const MovieRating = ({ rating }) => {
        const numericRaw = Number(rating);
        const numeric = Number.isFinite(numericRaw) ? numericRaw : 0;
        const clamped = Math.max(0, Math.min(5, Math.floor(numeric)));
        return (
            <div className="flex items-center gap-2">
                <div className="flex gap-1" aria-label={`Note: ${clamped} sur 5`}>
                    {[...Array(clamped)].map((_, index) => (
                        <FaStar key={index} color="#fff700" />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-black min-h-screen px-0 py-8">
            {/* <UserSidebare /> */}
            {/* <UserHeader /> */}
            <main className="w-full max-w-9xl mx-auto px-4 sm:px-8">
                {/* Fragment parent */}
                <>
                    {/* Ligne avec bouton à gauche et vidéo à droite */}
                    <div className="w-full flex flex-col items-center mb-2">
                        <Button />
                    </div>
                    <div className="relative flex-1 h-[360px] sm:h-[680px] md:h-[560px] m-auto overflow-hidden rounded-lg">
                        {/* Image ou Vidéo */}
                        {!isWatching ? (
                            <>
                                <img
                                    src={movie.thumbnailsUrl}
                                    alt={`Affiche de ${movie.title}`}
                                    className="w-full h-full object-cover transition-opacity duration-1000"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                                {/* Overlay sombre */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
                                {/* Titre en haut à gauche */}
                                <h2 className="absolute top-4 left-4 text-white font-bold text-left text-2xl sm:text-4xl z-10">
                                    {movie.title}
                                </h2>
                                {/* Bouton en bas à gauche */}
                                {movie.isPremium && movie.restricted ? (
                                    <a
                                        href="#subscription"
                                        className="absolute bottom-4 left-4 flex items-center gap-2 text-lg text-white bg-red-700 px-5 py-3 rounded-lg hover:opacity-80 font-bold cursor-pointer z-10"
                                    >
                                        Choisir une offre
                                    </a>
                                ) : (
                                    <div className="absolute bottom-4 right-4 flex items-center gap-6 z-10">
                                        <button
                                            onClick={() => setIsWatching(true)}
                                            className="flex items-center gap-2 text-xl text-white bg-neutral-950 px-7 py-4 rounded-lg hover:opacity-75 font-bold cursor-pointer"
                                        >
                                            Regarder <Play size={22} color="#ffce00" strokeWidth={2} />
                                        </button>
                                        <button
                                            className="bg-black bg-opacity-60 hover:bg-neutral-800 text-yellow-400 p-3 rounded-full transition cursor-pointer border-2 border-yellow-400"
                                            style={{ fontSize: '2rem' }}
                                            title="Mettre en favoris"
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleFavorite(movie._id); }}
                                        >
                                            <Bookmark size={32} color={isFavoris ? "#ffce00" : "#ffffff"} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            className="bg-black bg-opacity-60 hover:bg-neutral-800 text-yellow-400 p-3 rounded-full transition cursor-pointer border-2 border-yellow-400"
                                            style={{ fontSize: '2rem' }}
                                            title="Regarder plus tard"
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleWatchLater(movie._id); }}
                                        >
                                            <ClockFading size={32} color={isWatchLater ? "#ffce00" : "#ffffff"} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <video
                                src={movie.moviesUrl}
                                controls
                                autoPlay
                                controlsList="nodownload noplaybackrate"
                                disablePictureInPicture
                                playsInline
                                className="w-full h-full object-cover rounded-lg"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        )}
                    </div>
                    {/* Détails */}
                    <div className="flex flex-col max-w-6xl mx-auto mt-13 rounded-lg p-4">
                        <h3 className="text-left text-red-800 mask-linear-from-red-800 text-2xl sm:text-6xl font-bold mb-4">Détails</h3>
                        <h2 className="text-left mt-5 text-neutral-400 font-bold text-1xl sm:text-2xl z-1">
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
                    <div id="subscription">
                        <CardPayement />
                    </div>
                    {/* <div>
                        <Footer />
                    </div> */}
                </>
            </main>
        </div>
    );
};

export default MovieDetails;