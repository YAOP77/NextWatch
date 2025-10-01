// user/UserFavoris.jsx
import { useState, useEffect } from "react";
import UserSidebar from "./components/UserSidebar";
// import UserHeader from "./components/UserHeader";
// import UserReadMovie from "./components/UserReadMovie";
import UserMovieCard from "./components/UserMovieCard";
import UserMoviesCarousel from "./components/UserMoviesCarousel";
import useUserMovies from "./hooks/useUserMovies";
import { ArchiveX } from 'lucide-react';
import Button from '../../components/Button';

const UserFavoris = () => {
  const { favoris, addOrDeleteFavoris, watchLater } = useUserMovies();
  const [ selectedMovie, setSelectedMovie ] = useState(null);

  useEffect(() => {
    if (favoris.length > 0 && !selectedMovie) {
      const firstMovie = {
        ...favoris[0].movieId,
        thumbnailsUrl: `https://nextwatch-a3h9.onrender.com/${favoris[0].movieId.thumbnailsUrl.replace(/\\/g, '/')}`,
        moviesUrl: `https://nextwatch-a3h9.onrender.com/${favoris[0].movieId.moviesUrl.replace(/\\/g, '/')}`
      };
      setSelectedMovie(firstMovie);
    }
  }, [favoris, selectedMovie]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleToggleFavorite = async (movieId) => {
    await addOrDeleteFavoris(movieId);
    if (selectedMovie && selectedMovie._id === movieId) {
      const remaining = favoris.filter((m) => m.movieId._id !== movieId);
      setSelectedMovie(remaining.length > 0 ? remaining[0].movieId : null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
      <UserSidebar />
      <div className="flex-1 ml-0 md:ml-48">
        <main className="pt-20 px-6">
          <div className="mb-5 mt-5">
            <div className="block md:hidden w-fit">
              <Button />
            </div>
            <h1 className="text-red-800 mask-linear-from-red-800 text-5xl font-bold text-left mt-2">
              Mes Favoris
            </h1>
          </div>

          <section className="mt-10">
            {favoris.length > 0 ? (
              <UserMoviesCarousel
                movies={favoris.map(fav => ({
                  ...fav.movieId,
                  thumbnailsUrl: `https://nextwatch-a3h9.onrender.com/${fav.movieId.thumbnailsUrl.replace(/\\/g, '/')}`,
                  moviesUrl: `https://nextwatch-a3h9.onrender.com/${fav.movieId.moviesUrl.replace(/\\/g, '/')}`,
                  isFavoris: true,
                  showFavoriteIcon: true,
                  showWatchLaterIcon: false
                }))}
                onSelect={() => {}}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <div className="flex flex-wrap items-center justify-start m-auto gap-4 w-2/1">
                <p className="text-neutral-500 col-span-full">
                  Aucun film ajouté aux favoris.
                </p>
                <ArchiveX size={23} color="#adadad" strokeWidth={0.75} />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default UserFavoris;