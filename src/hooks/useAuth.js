import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;

// const useAuth = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const logout = () => {
//     localStorage.removeItem("user");
//   };
//   return { user, logout };
// };
