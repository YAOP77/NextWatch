import { useContext } from "react";
import { UserCategoryContext } from "../context/CategoryContext";

const useUserCategory = () => {
    return useContext(UserCategoryContext);
}

export default useUserCategory;