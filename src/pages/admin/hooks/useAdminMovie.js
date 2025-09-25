import { useContext } from "react";
import { AdminMoviesContext } from "../context/AdminMoviesContext";

const useAdminMovies = () => {
    return useContext(AdminMoviesContext);
}

export default useAdminMovies;