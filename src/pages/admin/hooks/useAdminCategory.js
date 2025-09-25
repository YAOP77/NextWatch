import { useContext } from "react";
import { CategoryContext } from "../context/AdminCategoryContext";

const useCategory = () => {
    return useContext(CategoryContext);
}

export default useCategory;