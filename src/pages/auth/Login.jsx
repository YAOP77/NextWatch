import { useState } from "react";
import ImageSlider from "../../components/ImageSlider";
import API from "../../services/securedAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Redirection from "../../utils/redirectByRole";
import { PulseLoader } from "react-spinners";
import { RiEyeCloseLine, RiEyeLine  } from "react-icons/ri";

const Login = () => {
    const [ message, setMessage ] = useState({ type: "", text: "" });
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [ loading, setLoading ] = useState(false);

    const [ formData, setFormData ] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleValidation = () => {
        if(!formData.email || !formData.password) {
            setMessage({ type: "error", text: "Veuillez remplir tous les champs" });
            return false;
        }

        if(!formData.email.includes("@")) {
            setMessage({ type: "error", text: "Email invalide" });
            return false
        }

        return true;
    }

    const handleViewPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!handleValidation()) return;

        try {
            const response = await API.post("/auth/login", formData);

            // Vérifie que le token est bien là
            // console.log("Token reçu:", response.data.token);

            // Recuperation de la reponse du backend
            const { user, token } = response.data;

            // Stocker uniquement le token
            localStorage.setItem("token", token);

            // Stocker les infos utilisateur séparément si besoin
            localStorage.setItem("user", JSON.stringify(user));
            
            login({ userData: user, tokenData: token });

            // Vérifie le contenu stocké
            // console.log("Stocké dans localStorage:", JSON.parse(localStorage.getItem("user")));

            setLoading(true);
            // setMessage({ type: "success", text: "Connexion en cours ..." });

            setTimeout(() => {
                // setMessage(null);
                Redirection(navigate, user.role);
            }, 5000);

        } catch (error) {
            console.log("Une erreur est survenue lors de la connexion", error);
        }
        // finally {
        //     setLoading(false);
        // }
    }

    return (
        <div className="flex items-center justify-center w-full h-full flex-wrap-reverse bg-neutral-950">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm h-[330px] mx-auto p-6 bg-neutral-950 border border-neutral-800 space-y-4 rounded-lg"
            >
                <h1 className="text-red-900 text-left pb-4 text-2xl font-bold">Connexion</h1>

                <div className="flex-col justify-items-start">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1 text-left">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    className="w-full px-4 py-2 text-white border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Exemple@gmail.com"
                />
                </div>

                <div className="relative flex-col justify-items-start">
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1 text-left">
                    Mot de passe
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-2 text-white border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="........"
                />
                <span
                    onClick={handleViewPassword}
                    className="absolute right-3 top-9 cursor-pointer text-white"
                >
                    {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                </span>
                </div>

                <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-4xl font-semibold transition duration-300 disabled:opacity-60 cursor-pointer"
                >
                    {loading ? (
                    <PulseLoader
                        cssOverride={{}}
                        loading
                        color="#ffde00"
                        margin={4}
                        size={7}
                        speedMultiplier={0.5}
                    />
                    ) : (
                    "Se connecter"
                    )}
                </button>
                </div>

                {message?.text && (
                <p
                    className={`text-center text-lg ${
                    message.type === "error"
                        ? "text-red-500 font-extralight text-sm py-10"
                        : "text-green-600"
                    }`}
                >
                    {message.text}
                </p>
                )}
            </form>

            <div>
                <ImageSlider />
            </div>
        </div>
    )
}

export default Login;