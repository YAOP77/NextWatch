import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UserMovieCard from "./UserMovieCard";

const UserMoviesCarousel = ({ movies = [], onSelect, onToggleFavorite, onToggleWatchLater }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative w-full">
      {/* Previous Button */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900 bg-opacity-80 rounded-full p-2 shadow hover:bg-neutral-800 transition hidden sm:block"
        onClick={() => scroll("left")}
        aria-label="Précédent"
        type="button"
      >
        <ChevronLeft size={28} color="#fff" />
      </button>
      {/* Next Button */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900 bg-opacity-80 rounded-full p-2 shadow hover:bg-neutral-800 transition hidden sm:block"
        onClick={() => scroll("right")}
        aria-label="Suivant"
        type="button"
      >
        <ChevronRight size={28} color="#fff" />
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 py-2 px-2 scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie) => (
          <UserMovieCard
            key={movie._id}
            movie={movie}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            onToggleWatchLater={onToggleWatchLater}
            isFavoris={movie.isFavoris}
            isWatchLater={movie.isWatchLater}
            showFavoriteIcon={true}
            showWatchLaterIcon={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserMoviesCarousel;
