import API from "../../../services/securedAxios";

const getCategory = async () => {
  try {
    const response = await API.get("/category");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const createCategory = async (data) => {
  try {
    const response = await API.post("/", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateCategory = async (id, data) => {
  try {
    const response = await API.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
    console.error(error);
    throw error.response?.data || { message: "Erreur inconnu" }
}

export default { getCategory, createCategory, updateCategory, deleteCategory };