// user/UserWatchLater.jsx
import { useState, useEffect } from "react";
import UserSidebar from "./components/UserSidebar";
// import UserHeader from "./components/UserHeader";
// import UserReadMovie from "./components/UserReadMovie";
import UserMovieCard from "./components/UserMovieCard";
import { Link } from "react-router-dom";
import useUserMovies from "./hooks/useUserMovies";
import { ArchiveX } from 'lucide-react';
import Button from '../../components/Button';

const UserWatchLater = () => {
  const { watchLater, addOrRemoveWatchLater, favoris } = useUserMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (watchLater.length > 0 && !selectedMovie) {
      const firstMovie = {
        ...watchLater[0].movieId,
        thumbnailsUrl: watchLater[0].movieId.thumbnailsUrl,
        moviesUrl: watchLater[0].movieId.moviesUrl,
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
          <div className="mb-5 mt-5">
            <div className="block md:hidden w-fit">
              <Button />
            </div>
            <h1 className="text-red-800 mask-linear-from-red-800 text-5xl font-bold text-left mt-2">
              À Regarder plus-tard
            </h1>
          </div>

          <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchLater && watchLater.filter(wat => wat && wat.movieId).length > 0 ? (
              watchLater
                .filter(wat => wat && wat.movieId)
                .map((wat) => {
                  const absoluteMovie = {
                    ...wat.movieId,
                    thumbnailsUrl: wat.movieId.thumbnailsUrl || (watchLater && watchLater[0] && watchLater[0].movieId ? watchLater[0].movieId.thumbnailsUrl : undefined),
                    moviesUrl: wat.movieId.moviesUrl || (watchLater && watchLater[0] && watchLater[0].movieId ? watchLater[0].movieId.moviesUrl : undefined),
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