import { useState } from "react";
import useAdminCategory from "./hooks/useAdminCategory";
import useAdminMovies from "./hooks/useAdminMovie";
import AdminMovieCard from "./components/AdminMovieCard";

const AdminMovie = () => {
  const { movies } = useAdminMovies();
  const { categories } = useAdminCategory();
  const [ selectedCategory, setSelectedCategory ] = useState("Tous");

  const filteredMovies = selectedCategory === "Tous"
    ? movies
    : movies.filter(movie => movie.category?.includes(
          categories.find(c => c.nom === selectedCategory)?._id
        )
      );
  
  // console.log("movie.category:", movies.map(m => m.category));

  return (
    <div className="p-6">
      {/* Boutons de catégories */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        <button onClick={() => setSelectedCategory("Tous")}
          className={`px-4 py-2 rounded-full border transition ${
            selectedCategory === "Tous"
              ? "bg-white text-black font-semibold"
              : "bg-gray-800 text-white"
          }`}
        >
          Tous
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category.nom)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === category.nom
                ? "bg-white text-black font-semibold"
                : "bg-gray-800 text-white"
            }`}
          >
            {category.nom}
          </button>
        ))}
      </div>

      {/* Liste des films */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
              <AdminMovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700">Aucun film trouvé pour cette catégorie.</p>
      )}
    </div>
  );
};

export default AdminMovie;