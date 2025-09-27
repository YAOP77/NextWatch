import { useState } from "react";
import ImageSlider from "../../components/ImageSlider";
import { RiEyeCloseLine, RiEyeLine  } from "react-icons/ri";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import API from "../../services/securedAxios";
import Redirection from "../../utils/redirectByRole";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState(null);
    const [ viewPassword, setViewPassword ] = useState(false);
    const [ viewPw, setViewPw ] = useState(false);
    const [ formData, setFormData ] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordFirst = () => {
        setViewPassword(!viewPassword);
    }

    const handlePasswordSecond = () => {
        setViewPw(!viewPw);
    }

    const handleValidation = () => {
        if(!formData.username || !formData.email || !formData.password || !formData.passwordConfirm) {
            setMessage({ type: "error", text: "Veuillez remplir tous les champs" });
            return false;
        }

        if(formData.password.length < 8) {
            setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 8 caratères" });
            return false;
        }

        if(!formData.email.includes("@")) {
            setMessage({ type: "error", text: "Email invalide" });
            return false;
        }

        if(formData.password !== formData.passwordConfirm) {
            setMessage({ type: "error", text: "Les mots de passe ne sont pas identique" });
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!handleValidation()) return;

        try {
            const response = await API.post("/auth/register", formData);
            const { user, token } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            login({ userData: user, tokenData: token });

            // setMessage({ type: "success", text: "Inscription réussie connexion en cour ..." })
            setLoading(true);

            setTimeout(() => {
                setMessage(null);
                Redirection(navigate, user.role);
            }, 5000); // 5 secondes

        } catch (error) {
            console.error("Une erreur est survenue lors de la connexion", error.stack);
        }

        // finally {
        //     setLoading(false);
        // }
    }

    return (
        <div className="flex items-center justify-center flex-wrap-reverse bg-neutral-950">
            <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm h-[480px] mx-auto p-6 bg-neutral-950 border
                border-neutral-800 space-y-4 rounded-lg"
            >
                <h1 className="text-red-900 text-2xl text-left pb-2 font-bold">Inscrivez-vous</h1>
            <div className="flex-col justify-items-start">
                <label htmlFor="username" className="block text-sm font-medium text-white mb-1 text-left">
                    Nom
                </label>
                <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-2 text-white border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Entrez un nom d'utilisateur"
                />
            </div>

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
                    placeholder="Entrez un email"
                />
            </div>

            <div className="relative flex-col justify-items-start">
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1 text-left">
                    Mot de passe
                </label>
                <input
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-2 border text-white border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Créer votre mot de passe"
                />
                <span
                    onClick={handlePasswordFirst}
                    className="absolute right-3 top-9 cursor-pointer text-white"
                >
                {viewPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                </span>
            </div>

            <div className="relative flex-col justify-items-start">
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-white mb-1 text-left">
                    Confirmation du mot de passe
                    </label>
                    <input
                    type={viewPw ? "text" : "password"}
                    name="passwordConfirm"
                    className="w-full px-4 py-2 text-white border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="Confirmé votre mot de passe"
                />
                <span
                    onClick={handlePasswordSecond}
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                    {viewPw ? <RiEyeLine /> : <RiEyeCloseLine />}
                </span>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-4xl
                    font-semibold transition duration-300 disabled:opacity-60 cursor-pointer"
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
                    "S'inscrire"
                )}
                </button>
            </div>

            {message && message.text && (
                <p
                    className={`text-center text-lg ${
                        message.type === "error"
                            ? "text-red-500 font-extralight text-sm py-2"
                            : "text-green-600"
                    }`}
                >
                    {message.text}
                </p>
            )}
            </form>
            <div className="relative rigth-70">
                <ImageSlider />
            </div>
        </div>
    )
}

export default Register