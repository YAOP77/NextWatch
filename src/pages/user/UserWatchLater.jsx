// user/UserWatchLater.jsx
import { useState, useEffect } from "react";
import UserSidebar from "./components/UserSidebar";
// import UserHeader from "./components/UserHeader";
// import UserReadMovie from "./components/UserReadMovie";
import UserMovieCard from "./components/UserMovieCard";
import { Link } from "react-router-dom";
import useUserMovies from "./hooks/useUserMovies";
import { ArchiveX } from 'lucide-react';

const UserWatchLater = () => {
  const { watchLater, addOrRemoveWatchLater, favoris } = useUserMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (watchLater.length > 0 && !selectedMovie) {
      const firstMovie = {
        ...watchLater[0].movieId,
        thumbnailsUrl: `https://nextwatch-a3h9.onrender.com/${watchLater[0].movieId.thumbnailsUrl.replace(/\\/g, '/')}`,
        moviesUrl: `https://nextwatch-a3h9.onrender.com/${watchLater[0].movieId.moviesUrl.replace(/\\/g, '/')}`
      };
      setSelectedMovie(firstMovie);
    }
  }, [watchLater, selectedMovie]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleToggleWatchLater = async (movieId) => {
    await addOrRemoveWatchLater(movieId);
    if (selectedMovie && selectedMovie._id === movieId) {
      const remaining = watchLater.filter((m) => m.movieId._id !== movieId);
      setSelectedMovie(remaining.length > 0 ? remaining[0].movieId : null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
      <UserSidebar />
      <div className="flex-1 ml-0 md:ml-48">
        <main className="pt-20 px-6">
          <h1 className="text-red-800 mask-linear-from-red-800 text-5xl font-bold text-left mb-5 mt-5">
            À Regarder plus-tard
          </h1>

          <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchLater.length > 0 ? (
              watchLater.map((wat) => {
                const absoluteMovie = {
                  ...wat.movieId,
                  thumbnailsUrl: `https://nextwatch-a3h9.onrender.com/${wat.movieId.thumbnailsUrl.replace(/\\/g, '/')}`,
                  moviesUrl: `https://nextwatch-a3h9.onrender.com/${wat.movieId.moviesUrl.replace(/\\/g, '/')}`
                };
                const detailsUrl = absoluteMovie.isPremium ? `/movies/premium/${absoluteMovie._id}` : `/movies/${absoluteMovie._id}`;
                return (
                  <Link to={detailsUrl} key={absoluteMovie._id} className="block">
                    <UserMovieCard
                      movie={absoluteMovie}
                      onSelect={handleSelectMovie}
                      onToggleWatchLater={handleToggleWatchLater}
                      isWatchLater={true}
                      showWatchLaterIcon={true}
                      showFavoriteIcon={false}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-wrap items-center justify-start m-auto gap-4 w-2/1">
                <p className="text-neutral-500 col-span-full">
                  Aucun film ajouté dans cette section.
                </p>
                <ArchiveX size={23} color="#adadad" strokeWidth={0.75} />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserWatchLater;