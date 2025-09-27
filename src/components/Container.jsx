import { useState } from "react";
import { motion } from "framer-motion";
import { BsSoundwave } from "react-icons/bs";
import { SiStreamlit } from "react-icons/si";
import { GiReceiveMoney } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Container = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "NextWatch est-il payant ?",
            answer:
                "NextWatch propose une sélection de films disponible gratuitement pour tester la plateforme, mais un abonnement à prix réduit est aussi possible.",
        },
        {
            question: "Puis-je regarder gratuitement des films ou séries ?",
            answer:
                "Malheureusement sur NextWatch nous ne proposons pas de séries mais plutôt des films en intégralité que nous mettons régulièrement chaque semaine de façon gratuit afin de vous donner une expérience qui sort de l'ordinaire.",
        },
        {
            question: "Sur quels appareils puis-je utiliser NextWatch ?",
            answer:
                "Vous pouvez profiter de NextWatch sur mobile, tablette, ordinateur et TV connectée, sans publicité.",
        },
        {
            question: "Puis-je annuler mon abonnement à tout moment ?",
            answer:
                "Non, il n’est plus possible d’annuler un abonnement une fois qu’il a été activé.",
        },
        {
            question: "De nouveaux films sont-ils publiés chaque semaine ?",
            answer:
                "Oui, nous publions de nouveaux films et séries chaque semaine afin de renouveler notre catalogue en continu.",
        },
        {
            question: "Est-il possible de télécharger des films ?",
            answer:
                "Non, il n'est pas possible de télécharger vos films préférés pour les regarder hors connexion.",
        },
    ];

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
        <section className="py-16 bg-neutral-950">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-5xl font-bold text-white mb-15 mask-linear-from-white">Pourquoi <span>nous choisir ?</span></h2>

                <div className="flex flex-wrap justify-center gap-15">
                    <motion.div
                        className="relative bg-neutral-950 text-white h-65 w-full sm:w-64 p-6 rounded-xl border border-neutral-900"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="absolute right-2 bottom-57 bg-neutral-100 text-white px-2 py-2 rounded-full text-sm font-semibold">
                            <BsSoundwave size={35} className="text-red-800"/>
                        </div>
                        <h3 className="mt-10 text-3xl font-bold mb-2">Streaming HD</h3>
                        <p className="text-neutral-400 text-sm mt-5">Profitez de vos films et séries en HD, sans pub, sur mobile, tablette et desktop.</p>
                    </motion.div>
                    <motion.div
                        className="relative bg-neutral-950 text-white h-65 w-full sm:w-64 p-6 rounded-xl border border-neutral-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="absolute right-2 bottom-57 bg-neutral-100 text-white px-2 py-2 rounded-full text-sm font-semibold">
                            <SiStreamlit size={35} className="text-red-800"/>
                        </div>
                        <h3 className="mt-10 text-3xl font-bold mb-2">Plan Gratuit</h3>
                        <p className="text-neutral-400 text-sm mt-5">Découvrez une sélection de films déjà disponibles gratuitement pour tous les utilisateurs.</p>
                    </motion.div>
                    <motion.div
                        className="relative bg-neutral-950 text-white h-65 w-full sm:w-64 p-6 rounded-xl border border-neutral-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="absolute right-2 bottom-57 bg-neutral-100 text-white px-2 py-2 rounded-full text-sm font-semibold">
                            <GiReceiveMoney size={35} className="text-red-800"/>
                        </div>
                        <h3 className="mt-10 text-3xl font-bold mb-2">Abonnement à bas prix</h3>
                        <p className="text-neutral-400 text-sm mt-5">Profitez de tous nos films et séries avec un abonnement abordable et flexible.</p>
                    </motion.div>
                </div>
            </div>
        </section>
        <section className="py-16 bg-neutral-950">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl font-bold text-white mb-15 mask-linear-from-white">
                    FAQ – Foire aux questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-neutral-800 rounded-lg overflow-hidden"
                        >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center px-4 py-3 bg-neutral-900 text-white text-left"
                        >
                            <span className="text-xl">{faq.question}</span>
                            <span className="ml-2 text-3xl cursor-pointer">
                                {openIndex === index ? <FaMinus /> : <FaPlus/>}
                            </span>
                        </button>

                        <div
                            className={`px-4 bg-neutral-800 text-neutral-100 text-left transition-all duration-300 ease-in-out ${
                            openIndex === index
                                ? "max-h-40 py-3"
                                : "max-h-0 overflow-hidden"
                            }`}
                        >
                            {faq.answer}
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}

export default Container;