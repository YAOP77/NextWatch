import axios from "axios";
import authHeader from "../utils/authHeader";

const API_URL = import.meta.env.VITE_API_URL;

const paymentCreation = async (offer, userId) => {
    console.log("Offer:", offer);
    console.log("UserId:", userId);

    try {
        const response = await axios.post(`${API_URL}/user/payment/create`, 
            { offer, userId }, 
            { headers: authHeader() }
        );
        
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du paiement", error);
        throw error;
    }
};

// Vérifier statut du paiement
const verifyPayment = async (transactionId) => {
    const response = await axios.get(`${API_URL}/user/payment/verify/${transactionId}`, {
        headers: authHeader()
    });
    // { status: "SUCCESS", subscription: "monthly", user: {...} }
    return response.data;
};

export default { paymentCreation, verifyPayment };