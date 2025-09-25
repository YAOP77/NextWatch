import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userPaymentService from "../../../services/userPaymentService";
import useAuth from "../../../hooks/useAuth";

const PaymentVerify = () => {
  const { transactionId } = useParams();
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await userPaymentService.verifyPayment(transactionId);

        if (result.status === "SUCCESS") {
          updateUser(result.user); // met à jour abonnement dans AuthContext
          navigate("/premium");   // redirection
        } else {
          navigate("/payment");   // retour paiement si échec
        }
      } catch (error) {
        console.error("Erreur vérification paiement :", error);
        navigate("/payment");
      }
    };

    verify();
  }, [transactionId, updateUser, navigate]);

  return <p className="text-white">Vérification du paiement en cours...</p>;
};

export default PaymentVerify;