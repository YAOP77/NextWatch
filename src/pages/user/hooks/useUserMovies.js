import { useContext } from "react";
import { UserMoviesContext } from "../context/UserContextMovies";

const useUserMovies = () => {
    return useContext(UserMoviesContext);
}

export default useUserMovies;