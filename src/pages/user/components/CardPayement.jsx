import { FaCheck } from "react-icons/fa";
import userPaymentService from "../../../services/userPaymentService";
import useAuth from "../../../hooks/useAuth";

const CardPayement = () => {
    const { updateUser, user } = useAuth();
    const userId = user.id;
    // console.log("User ID :", userId);

    const offers = [
        { id: 1, title: "Essaie", duration: "1 semaine", price: 1000, plan: "weekly", color: "red-900" },
        { id: 2, title: "Renouvelable", duration: "1 mois", price: 5000, plan: "monthly", color: "orange-900" },
        { id: 3, title: "Bonus fidélité", duration: "1 an", price: 10000, plan: "yearly", color: "emerald-900" },
    ];

    const handleSubscribe = async (offer, user) => {
        try {
            // 1. Crée transaction backend
            const response = await userPaymentService.paymentCreation(offer, userId);

            // 2. Redirection vers CinetPay (ou autre)
            window.location.href = response.payment_url;

            // Après paiement, user revient sur /payment/verify/:transactionId
        } catch (error) {
            console.error("Erreur paiement:", error);
        }
    };

    return (
        <div className="bg-black px-4 py-10">
            <h1 className="text-white text-3xl sm:text-4xl mb-10 text-center">Choisir ma meilleure offre</h1>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                {offers.map((offer) => (
                <div
                    key={offer.id}
                    onClick={() => handleSubscribe(offer)}
                    className={`hover:rotate-3 transition-transform duration-500 cursor-pointer bg-gradient-to-t from-black to-${offer.color} p-4 flex flex-col text-left text-white border-t border-${offer.color} w-full sm:w-64 h-75 rounded-xl`}
                >
                    <h4 className="text-xl sm:text-2xl mb-6 font-semibold">{offer.title}</h4>
                    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> {offer.duration}</p>
                    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Accès immédiat</p>
                    <p className="text-xl mb-2 flex items-center gap-4 mt-7 font-bold">
                    {offer.price.toLocaleString()} CFA
                    </p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default CardPayement;

// const CardPayement = () => {
//     // récupère l’utilisateur connecté (via AuthContext)
//     const { user } = useAuth();

//     const handleSubscribe = async (offer) => {
//             if (!user) {
//             alert("Tu dois être connecté pour t’abonner.");
//             return;
//         }

//         try {
//             const response = await paymentCreation(offer, user._id);

//             if (response.payment_url) {
//                 window.location.href = response.payment_url;
//             } else {
//                 alert("Erreur: pas de lien de paiement reçu.");
//             }
//         } catch (err) {
//             alert("Impossible de créer le paiement.");
//             console.error(err);
//         }
//     };

//     const offers = [
//         { id: 1, title: "Essaie", duration: "1 semaine", price: 1000, color: "red-900" },
//         { id: 2, title: "Renouvelable", duration: "1 mois", price: 5000, color: "orange-900" },
//         { id: 3, title: "Bonus fidélité", duration: "1 an", price: 10000, color: "emerald-900" },
//     ];

//     return (
//         <div className="bg-black px-4 py-10">
//             <h1 className="text-white text-3xl sm:text-4xl mb-10 text-center">
//                 Choisir ma meilleure offre
//             </h1>

//             <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
//                 {offers.map((offer) => (
//                 <div
//                     key={offer.id}
//                     onClick={() => handleSubscribe(offer)}
//                     className={`hover:rotate-3 transition-transform duration-500 cursor-pointer bg-gradient-to-t from-black to-${offer.color} p-4 flex flex-col text-left text-white border-t border-${offer.color} w-full sm:w-64 h-75 rounded-xl`}
//                 >
//                     <h4 className="text-xl sm:text-2xl mb-6 font-semibold">{offer.title}</h4>
//                     <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> {offer.duration}</p>
//                     <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Accès immédiat</p>
//                     <p className="text-xl mb-2 flex items-center gap-4 mt-7 font-bold">
//                         {offer.price.toLocaleString()} CFA
//                     </p>
//                 </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

//  ---------------------------------- //


{/* <div className="flex flex-wrap justify-center gap-6 sm:gap-10"> */}
{/* Carte 1 */}
{/* <div className="hover:rotate-3 transition-transform duration-500 cursor-pointer bg-gradient-to-t from-black to-red-900 p-4 flex flex-col text-left text-white border-t border-red-900 w-full sm:w-64 h-75 rounded-xl">
    <h4 className="text-xl sm:text-2xl mb-6 font-semibold">Essaie</h4>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> 1 semaine</p>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Prix mini</p>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Accès immédiat</p>
    <p className="text-xl mb-2 flex items-center gap-4 mt-7 font-bold">1 000 CFA</p>
</div> */}

{/* Carte 2 */}
{/* <div className="hover:rotate-3 transition-transform duration-500 cursor-pointer bg-gradient-to-t from-black to-orange-900 p-4 flex flex-col text-left text-white border-t border-orange-900 w-full sm:w-64 h-75 rounded-xl">
    <h4 className="text-xl sm:text-2xl mb-4">Renouvelable</h4>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> 1 mois</p>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Prix moyen</p>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Parfait pour les familles ou colocations</p>
    <p className="text-xl mb-2 flex items-center gap-4 mt-5 font-bold">5 000 CFA</p>
</div> */}

{/* Carte 3 */}
{/* <div className="hover:rotate-3 transition-transform duration-500 cursor-pointer bg-gradient-to-t from-black to-emerald-900 p-4 flex flex-col text-left text-white border-t border-emerald-900 w-full sm:w-64 h-75 rounded-xl">
    <h4 className="text-xl sm:text-2xl mb-4">Bonus fidélité</h4>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> 1 ans</p>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Prix élevé</p>
    <p className="text-sm mb-2 flex items-center gap-4"><FaCheck /> Accès immédiat</p>
    <p className="text-xl mb-2 flex items-center gap-4 mt-9 font-bold">10 000 CFA</p>
</div> */}
{/* </div> */}