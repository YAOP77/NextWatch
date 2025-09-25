// import { useEffect, useState } from "react";
// import UserHeader from "./components/UserHeader";
// import UserSidebar from "./components/UserSidebar";
// import UserMovieCard from "./components/UserMovieCard";
// import UserReadMovie from "./components/UserReadMovie";
// import useUserMovies from "./hooks/useUserMovies";

// const UserSearch = () => {
//   const { searchResults, search, favoris, addOrDeleteFavoris } = useUserMovies();
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   // sélection auto du 1er film
//   useEffect(() => {
//     if (searchResults.length > 0) {
//       setSelectedMovie(searchResults[0]);
//     } else {
//       setSelectedMovie(null);
//     }
//   }, [searchResults]);

//   const handleSelectMovie = (movie) => {
//     setSelectedMovie(movie);
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
//       {/* Sidebar */}
//       <UserSidebar />

//       {/* Contenu principal */}
//       <div className="flex-1 ml-0 md:ml-48">
//         <UserHeader onSearch={search} />

//         <main className="pt-20 px-6">
//           {/* Film sélectionné */}
//           {selectedMovie && (
//             <UserReadMovie movie={selectedMovie} />
//           )}

//           <h1 className="text-yellow-400 text-2xl font-bold mb-5">
//             Résultats de recherche
//           </h1>

//           <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {searchResults.length > 0 ? (
//               searchResults.map((movie) => (
//                 <UserMovieCard
//                   key={movie._id}
//                   movie={movie}
//                   onSelect={handleSelectMovie}
//                   onToggleFavorite={addOrDeleteFavoris}
//                   isFavoris={favoris.includes(movie._id)}
//                 />
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-full">
//                 Aucun film trouvé.
//               </p>
//             )}
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserSearch;