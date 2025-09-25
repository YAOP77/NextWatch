import { useState } from "react";
import { Play } from 'lucide-react';
// import { Star } from 'lucide-react';
import { FaStar } from "react-icons/fa6";

const UserReadMovie = ({ movie }) => {
  const [isPlaying, setIsPlaying] = useState(false);


  const MovieRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, index) => (
          <FaStar key={index} color="#fff700" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start bg-black p-4 rounded-lg shadow-lg">
      <div className="relative w-full md:w-2/4 h-78 rounded-xl bg-black overflow-hidden">
        {isPlaying ? (
          <video 
            src={movie.moviesUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-cover "
          />
        ) : (
          <>
          { movie.moviesUrl ? (
            <img
              src={movie.thumbnailsUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <p>Aucune image trouvé</p>
          )}
            <button
              aria-label={`Regarder ${movie.title}`}
              className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-white bg-neutral-950
              px-4 py-2 rounded-lg hover:opacity-75 font-bold cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              Regarder <Play size={15} color="#ffce00" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {/* Détails */}
      <div className="flex-1">
        <h2 className="text-5xl text-left font-bold text-white z-10 bg-black pb-3">{movie.title}</h2>
        <div className="overflow-y-scroll h-30">
          <p className="text-gray-400 mt-4 text-left text-sm z-0">{movie.description}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-4 mt-1">
          <p className="text-neutral-500 mt-4 text-sm rounded-lg
            border border-neutral-800 text-center px-2 py-1 bg-neutral-950
          ">
            {movie.category?.nom}
          </p>
          <p className="text-neutral-500 mt-4 text-sm rounded-lg
            border border-neutral-800 text-center px-2 py-1 bg-neutral-950
          ">
            {movie.duration}
          </p>
          <div className="flex items-center gap-2 text-neutral-500 mt-4 text-sm rounded-lg
            border border-neutral-800 text-center px-2 py-1 bg-neutral-950
          ">
            <MovieRating rating={movie.rating} />
          </div>
          <p className="flex items-center gap-2 text-neutral-500 mt-4 text-sm rounded-lg
            border border-neutral-800 text-center px-2 py-1 bg-neutral-950
          ">
            {movie.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserReadMovie;

// bg-gradient-to-t from-black

{/* <div className="overflow-y-scroll h-40 border border-red-500">
</div> */}