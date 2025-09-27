import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Footer from "../../components/Footer";
import Loader from "../../components/loader/loader";
// import UserSidebare from "./components/UserSidebar";
import userMoviesService from "./services/userMoviesService";
import SimilarMovies from "./components/SimilarMovies";
import CardPayement from "./components/CardPayement";
import { Play, Tag, Clock3, CalendarDays } from 'lucide-react';
import Button from '../../components/Button';
import { FaStar } from "react-icons/fa6";

const MoviesPremiumDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isWatching, setIsWatching] = useState(false);

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
            {/* Ligne avec bouton à gauche et vidéo à droite */}
            <div className="flex items-start gap-4 justify-center w-full">

                <div className="w-full mb-4">
                    <Button onClick={() => window.history.back()} />
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

                    {/* Titre et infos vidéo en haut à gauche */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <h2 className="text-white font-bold text-left text-2xl sm:text-4xl">{movie.title}</h2>
                        <div className="flex gap-4 text-white text-sm items-center">
                            <Tag size={18} /> {movie.category?.nom || movie.category?.name || '—'}
                            <Clock3 size={18} /> {movie.duration || '—'} min
                            <CalendarDays size={18} /> {movie.year || '—'}
                            <MovieRating rating={movie.rating} />
                        </div>
                    </div>

                    {/* Bouton en bas à gauche */}
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
                            onClick={() => setIsWatching(true)}
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
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        playsInline
                        className="w-full h-full object-cover rounded-lg"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                )}
                </div>
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
                <div className="flex flex-wrap mt-4 gap-4">
                    <p className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center gap-2">
                        <Tag size={16} /> {movie.category?.nom}
                    </p>
                    <p className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center gap-2">
                        <Clock3 size={16} /> {movie.duration}
                    </p>
                    <div className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center">
                        <MovieRating rating={movie.rating} />
                    </div>
                    <p className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center gap-2">
                        <CalendarDays size={16} /> {movie.date}
                    </p>
                </div>
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
            </main>
        </div>
    );
};

export default MoviesPremiumDetails;