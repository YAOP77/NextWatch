import { createContext, useState, useEffect } from "react";
import categoryServices from "../services/adminCategoryServices";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const getCategory = async () => {
        try {
            setLoading(true);
            const data = await categoryServices.getCategory();
            setCategories(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const addCategory = async (nom) => {
        try {
            setLoading(true);
            const data = await categoryServices.addCategory(nom);
            setCategories((prev) => [...prev, data]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateCategory = async (id, nom) => {
        try {
            setLoading(true);
            const data = await categoryServices.updateCategory(id, nom);
            setCategories((prev) => prev.map(
                category => category.id === id ? data : category
            ));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            const data = await categoryServices.deleteCategory(id);
            setCategories((prev) => prev.filter(category => category.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <CategoryContext.Provider value={{
                categories,
                loading,
                error,
                getCategory,
                addCategory,
                updateCategory,
                deleteCategory
            }}>
            { children }
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;