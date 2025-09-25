import { createContext, useState, useEffect } from "react";
import userCategoryService from "../services/userCategoryService";

export const UserCategoryContext = createContext();

const UserCategoryProvider = ({ children }) => {
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null)

    const allCategory = async () => {
        try {
            setLoading(true);
            const data = await userCategoryService.readAllCategory();
            return setCategories(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        allCategory();
    }, [])

    return (
        <UserCategoryContext.Provider value={{
            categories,
            loading,
            error,
            allCategory
        }}>
            { children }
        </UserCategoryContext.Provider>
    )
}

export default UserCategoryProvider;