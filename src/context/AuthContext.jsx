// Importation du context de useState et useEffect
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

// Création d'un context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Gestion de l'etat de l'utilisation ( user, token, authentification )
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // ON vérifie si storedUser et storedToken contienne des valeurs
    if (storedUser && storedToken) {
      // Met à jour l'etat de l'utilisateur
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/movies/premium/me`, {
          headers: authHeader()
        })
        // console.log("Données envoyé", response.data || undefined);
        setUser(response.data);
      } catch (error) {
        console.error("Erreur récupération utilisateur:", error);
      }
    };

    fetchUser();
    // Rafraîchit l'utilisateur au retour depuis la page de paiement (focus onglet)
    window.addEventListener('focus', fetchUser);
    return () => window.removeEventListener('focus', fetchUser);
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     console.log("Info user :", user.subscription);
  //   }
  // }, [user]);

  //Connecter l'utilisateur
  const login = ({ userData, tokenData }) => {
    setUser(userData);
    setToken(tokenData);
    setIsAuthenticated(true);
    
    // Sauvegarder ses information dans le navigateur ( pour le refresh si ajouté )
    localStorage.setItem("user", JSON.stringify(userData));
    // Sauvegarder le token dans le navigateur pour les appels Backend avec autorisation
    localStorage.setItem("token", tokenData);
  };

  // Deconnecter l'utilisateur
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Vérifie si user a un abonnement actif
  const hasSubscription = () => {
    return user?.subscription && ["weekly", "monthly", "yearly"].includes(user.subscription);
  };
  // console.log(user);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Retourne le composant provider avec les valeurs accessible
  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, hasSubscription, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Tu ne fais pas appel à des hooks dans des fichiers non React → tu restes conforme aux règles des hooks.