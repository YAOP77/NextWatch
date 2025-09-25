import { Bookmark, ClockFading } from 'lucide-react';

const UserMoviesCard = ({
  movie, 
  onSelect, 
  isFavoris, 
  isWatchLater, 
  onToggleFavorite, 
  onToggleWatchLater, 
  showFavoriteIcon = true,
  showWatchLaterIcon = true,
}) => {
  return (
    <div 
      className="relative w-48 h-65 mb-10 bg-neutral-900 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
      onClick={() => onSelect(movie)}
    >
      <img 
        src={movie.thumbnailsUrl} 
        alt={movie.title} 
        className="w-full h-full object-cover group-hover:opacity-80 transition" 
      />

      {showFavoriteIcon && (
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-neutral-800
          text-yellow-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
          title="Mettre en favoris"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(movie._id);
          }}
        >
          <Bookmark 
            size={20} 
            color={isFavoris ? "#ffce00" : "#ffffff"} 
            strokeWidth={1.75} 
          />
        </button>
      )}

      {showWatchLaterIcon && (
        <button
          className="absolute top-2 left-2 bg-black bg-opacity-50 hover:bg-neutral-800
          text-yellow-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
          title="Regarder plus tard"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWatchLater(movie._id);
          }}
        >
          <ClockFading 
            size={20} 
            color={isWatchLater ? "#ffce00" : "#ffffff"} 
            strokeWidth={1.75} 
          />
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-white text-lg font-bold truncate">{movie.title}</p>
      </div>
    </div>
  );
};

export default UserMoviesCard;