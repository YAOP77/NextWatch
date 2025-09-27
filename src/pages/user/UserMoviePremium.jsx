import Button from '../../components/Button';
import { Tag, Clock3, CalendarDays } from 'lucide-react';
import { useState, useEffect } from "react";
import UserHeader from "./components/UserHeader";
import UserSidebare from "./components/UserSidebar";
import UserMoviesCard from "./components/UserMovieCard";
import useUserMovies from "./hooks/useUserMovies";
import Footer from "../../components/Footer";
import useUserCategory from "./hooks/userCategory";
import userMoviesService from "./services/userMoviesService";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";

const UserMoviePremium = () => {
  const { moviesPremium, favoris, watchLater, addOrDeleteFavoris, addOrRemoveWatchLater, loading } = useUserMovies();
  const { categories } = useUserCategory();

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const searchPremiumMovies = async (queryText) => {
    try {
      const data = await userMoviesService.SearchPremiumMovies(queryText);
      setQueryResults(data || []);
    } catch (error) {
      console.error("Erreur recherche :", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        searchPremiumMovies(query);
      } else {
        setQueryResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const filteredMovies = selectedCategory === "Tous"
    ? moviesPremium
    : moviesPremium.filter(movie => {
        const selectedCatId = categories.find(c => c.nom === selectedCategory)?._id;
        if (!selectedCatId) return false;

        if (Array.isArray(movie?.category)) {
          return movie.category.includes(selectedCatId);
        }
        if (typeof movie?.category === 'object' && movie.category !== null) {
          return movie.category._id === selectedCatId;
        }
        if (typeof movie?.category === 'string') {
          return movie.category === selectedCatId;
        }
        return false;
      });

  const displayedMovies = query.trim() ? queryResults : filteredMovies;

  const getMoviesByCategory = (moviesList) => {
    const grouped = {};

    moviesList.forEach((movie) => {
      const cat = movie.category?.nom || movie.category?.name || "Autres";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(movie);
    });

    return grouped;
  };

  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
      <UserSidebare />

      <div className="flex-1 ml-0 md:ml-48">
        <UserHeader onSearch={setQuery} />

        <main className="pt-20 px-6">
          <div className="w-full mb-4">
            <Button onClick={() => window.history.back()} />
          </div>
          {/* <h1 className="text-red-500 text-5xl font-bold text-left mb-5 mt-5">Explore</h1> */}

          <div className="bg-black flex gap-3 top-16 overflow-x-auto fixed w-full z-10 h-15 py-2">
            <button onClick={() => setSelectedCategory("Tous")}
              className={`px-4 py-2 rounded-lg border border-neutral-800 cursor-pointer transition ${
                selectedCategory === "Tous"
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-950 text-white hover:opacity-80"
              }`}
            >
              Tous
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.nom)}
                className={`px-4 py-2 rounded-lg border border-neutral-800 cursor-pointer transition ${
                  selectedCategory === cat.nom
                    ? "bg-white text-black font-semibold"
                    : "bg-neutral-950 text-white hover:opacity-80"
                }`}
              >
                {cat.nom}
              </button>
            ))}
          </div>

          <h1 className="text-red-800 mask-linear-from-red-800 text-6xl font-bold text-left mb-5 mt-15">Films premium</h1>
          
          {loading ? (
            <Loader />
          ) : (
            <section className="mt-10 space-y-6">
              {Object.keys(getMoviesByCategory(displayedMovies)).length === 0 ? (
                <div className="text-center text-gray-500 text-xm py-10">
                  Aucun film disponible
                </div>
              ) : (
                Object.entries(getMoviesByCategory(displayedMovies)).map(([categoryName, moviesPremium]) => (
                  <div key={categoryName} className="mb-8">
                    <h2 className="text-3xl text-left text-neutral-400 font-bold mb-4">{categoryName}</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2 scroll-snap-x">
                      {moviesPremium.map((movie) => (
                        <Link to={`/movies/premium/${movie._id}`} key={movie._id} className="min-w-[200px]">
                          <div className="bg-neutral-950 rounded-lg shadow p-4 flex flex-col gap-2">
                            <img src={movie.thumbnailsUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md mb-2" />
                            <h3 className="text-lg font-bold text-white mb-1">{movie.title}</h3>
                            <div className="flex gap-4 text-white text-sm items-center mb-2">
                              <span className="flex items-center gap-1"><Tag size={16} /> {movie.category?.nom || movie.category?.name || '—'}</span>
                              <span className="flex items-center gap-1"><Clock3 size={16} /> {movie.duration || '—'} min</span>
                              <span className="flex items-center gap-1"><CalendarDays size={16} /> {movie.year || '—'}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{movie.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          )}
        </main>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserMoviePremium;