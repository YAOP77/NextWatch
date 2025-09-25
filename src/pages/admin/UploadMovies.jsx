import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useCategory from "./hooks/useAdminCategory";
import useAdminMovies from "./hooks/useAdminMovie";
import useAuth from "../../hooks/useAuth";

// Fonction pour uploadé un films
const UploadMovies = () => {
    // Gestion des etats
    const { user, logout } = useAuth();
    const { categories } = useCategory();
    const { addMovies } = useAdminMovies();

    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState({ type: "", text: "" });
    const [ formData, setFormData ] = useState({
        title: "",
        thumbnail: null,
        movie: null,
        rating: "",
        date: "",
        duration: "",
        category: "",
        description: "",
        isPremium: false
    });

    useEffect(() => {
    if(categories.length > 0) {
        setFormData((prev) => ({
            ...prev,
            category: categories[0]._id
        }));
    }
    }, [categories]);
    
    const navigate = useNavigate();

    // Fonction de gestion de changement des inputs
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if(name === "movie" || name === "thumbnail") {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const handleValidation = () => {
        if(!formData.title || !formData.thumbnail || !formData.movie || !formData.category || !formData.description) {
            setMessage({ type: "error", text: "Tous les champs sont requis"});
            return false
        }

        return true;
    }

    // Fonction d'envoi de requête au backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!handleValidation()) return;

        // Préparation des données
        const uploadsData = new FormData();
        uploadsData.append("title", formData.title);
        uploadsData.append("thumbnail", formData.thumbnail);
        uploadsData.append("movie", formData.movie);
        uploadsData.append("description", formData.description);
        uploadsData.append("category", formData.category);
        uploadsData.append("duration", formData.duration);
        uploadsData.append("date", formData.date);
        uploadsData.append("rating", formData.rating);
        uploadsData.append("userId", user?.id);
        uploadsData.append("isPremium", formData.isPremium);
        // uploadsData.append("isPremium", formData.isPremium ? "true" : "false");

        // console.log("movie file:", formData.movie);
        // console.log("thumbnail file:", formData.thumbnail);

        try {
            setLoading(true);
            await addMovies(uploadsData);
            setFormData({ title: "", thumbnail: null, movie: null, category: "", date: "", duration: "", rating: "", isPremium: false, description: "" });
            setMessage({ type: "success", text: "Films publié avec succès" });
        } catch (error) {
            console.error("Une erreur est survenue lors de la publication", error);
            setMessage({ type: "error", text: error.message || "Erreur inconnu" });
        } finally {
            // On arrêter le spinner
            setLoading(false);
        }
    }

    return (
        <section>
            <h1 className="text-6xl text-gray-950 text-left font-bold">Publié un Film</h1>
            <div>
                <button onClick={handleLogout}>Deconnexion</button>
                <a href="/admin/all">Voir les films</a>
                <form onSubmit={handleSubmit} className="w-150 h-90 flex flex-col items-center gap-2">

                    <div className="flex flex-col items-start">
                        <label htmlFor="title" className="text-sm font-light">Titre</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-100 p-2 rounded-lg border border-gray-800" />
                    </div>

                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col items-start">
                            <label htmlFor="thumbnail" className="text-sm font-light mb-1">Image</label>
                            <input type="file" name="thumbnail" accept="image/*" onChange={handleInputChange} className="w-47 p-2 rounded-lg border border-gray-800" />
                        </div>

                        <div className="flex flex-col items-start">
                            <label htmlFor="movie" className="text-sm font-light mb-1">Video</label>
                            <input type="file" name="movie" accept="video/*" onChange={handleInputChange} className="w-47 p-2 rounded-lg border border-gray-800" />
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="cateory" className="text-sm font-light">Categorie</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-100 p-2 rounded-lg border border-gray-800">
                            { categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col items-start">
                            <label htmlFor="date" className="text-sm font-light mb-1">Date de sortie</label>
                            <input type="text" name="date" onChange={handleInputChange} placeholder="Entrez la date de sortie" className="w-47 p-2 rounded-lg border border-gray-800" />
                        </div>

                        <div className="flex flex-col items-start">
                            <label htmlFor="duration" className="text-sm font-light mb-1">Durée</label>
                            <input type="text" name="duration" onChange={handleInputChange} placeholder="Entrez la durée du film" className="w-47 p-2 rounded-lg border border-gray-800" />
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="rating" className="text-sm font-light">Note</label>
                        <select name="rating" onChange={handleInputChange} className="w-100 p-2 rounded-lg border border-gray-800">
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-sm font-light">Type de vidéo</label>
                        <div className="flex justify-start gap-10 mt-1 w-98">
                            <label>
                                <input
                                    type="radio"
                                    name="isPremium"
                                    value="false"
                                    checked={!formData.isPremium}
                                    onChange={() => setFormData({ ...formData, isPremium: false })}
                                />
                                Gratuite
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="isPremium"
                                    value="true"
                                    checked={formData.isPremium}
                                    onChange={() => setFormData({ ...formData, isPremium: true })}
                                />
                                Premium
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="description" className="text-sm font-light">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-100 p-2 rounded-lg border border-gray-800"></textarea>
                    </div>
                    
                    <div className="flex flex-col items-start mt-3">
                        <button type="submit" className="w-100 p-2 text-lg duration-700 ease-out rounded-lg
                            border border-yellow-500 cursor-pointer bg-yellow-500 text-white hover:bg-yellow-400 hover:text-white">
                            { loading ? <PulseLoader  cssOverride={{}}  loading color="#000"  margin={4}  size={7}  speedMultiplier={0.5}/> : "Se connecter" }
                        </button>
                    </div>
                </form>
                    { message?.text && (
                        <p className={ message.type === "error" ? "text-red-600" : "text-green-600"}>
                            { message.text }
                        </p>
                    )}
            </div>
        </section>
    )
}

export default UploadMovies;