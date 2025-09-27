import { Tag, Clock3, CalendarDays } from 'lucide-react';
import { FaStar } from "react-icons/fa6";

export const VideoInfoIcons = ({ movie }) => (
  <div className="flex flex-wrap mt-4 gap-4">
    <p className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center gap-2">
      <Tag size={16} /> {movie.category?.nom}
    </p>
    <p className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center gap-2">
      <Clock3 size={16} /> {movie.duration}
    </p>
    <div className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center">
      {[...Array(Number(movie.rating) || 0)].map((_, index) => (
        <FaStar key={index} color="#fff700" />
      ))}
    </div>
    <p className="text-neutral-500 text-sm sm:text-base border px-3 py-1 bg-neutral-950 rounded-lg flex items-center gap-2">
      <CalendarDays size={16} /> {movie.date}
    </p>
  </div>
);
