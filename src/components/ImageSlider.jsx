import { motion } from "framer-motion";

// Ligne 1
import img1 from "../assets/images/alien-romulus.jpg";
import img2 from "../assets/images/Stans - Eminem et ses plus grands fans.jpg";
import img3 from "../assets/images/Superman MULTI TRUEFRENCH.webp";
import img4 from "../assets/images/Wish .jpg";
import img5 from "../assets/images/Maurice FRENCH WEBRIP.jpg";
import img6 from "../assets/images/Minecraft, Le Film - A Minecraft Movie.jpg";
import img7 from "../assets/images/Blanche Neige - Disney's.jpg";
import img8 from "../assets/images/MAURICE LE CHAT FABULEUX.jpg";

// Ligne 2
import img9 from "../assets/images/new-gods-nezha-reborn.jpg";
import img10 from "../assets/images/Cover-NarutoEx.jpg";
import img11 from "../assets/images/deadpool-wolverine-tout-savoir-sur-le-film-marvel_jpg.jpg";
import img12 from "../assets/images/lgdp_posterb_27x40_final_080323_a35372ef.jpeg";
import img13 from "../assets/images/Venom.jpeg";
import img14 from "../assets/images/transformers-one-2024-film-official-poster.avif";
import img15 from "../assets/images/hajime-no-ippo-champion-road-tv-special.webp";
import img16 from "../assets/images/Snniser.jpeg";

// Ligne 3
import img17 from "../assets/images/Apollo 11 Les fichiers oublies.jpeg";
import img18 from "../assets/images/Harry Potter  Retour à Poudlard.jpg";
import img19 from "../assets/images/L'Ombre rebelle - The Shadow.webp";
import img20 from "../assets/images/Marvel's Behind The Mask FRENCH.jpg";
import img21 from "../assets/images/La Techno XXL D'Une Plate-forme Petroliere.jpg";
import img22 from "../assets/images/One Life MULTI BluRay .jpg";
import img23 from "../assets/images/Jour J - La Bataille De Normandie.webp";
import img24 from "../assets/images/cybercriminalite_des_attaques_bien_reelles.jpg";

const imagesLine1 = [img1, img2, img3, img4, img5, img6, img7, img8];
const imagesLine2 = [img9, img10, img11, img12, img13, img14, img15, img16];
const imagesLine3 = [img17, img18, img19, img20, img21, img22, img23, img24];

const imageGroups = [imagesLine1, imagesLine2, imagesLine3];
const directions = ["left", "right", "left"];

const MultiLineSlider = () => {
  return (
    <div className="relative mr-30 w-xl h-[500px] overflow-hidden z-3 rounded-xl shadow-lg">
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-neutral-950 to-transparent z-3 pointer-events-none" />
            <div className="absolute inset-0 z-0 flex flex-col gap-8 px-4 bg-neutral-950">
                <h1 className="text-white sm:text-5xl text-4xl font-extrabold text-center relative sm:static top-4 left-15">
                    Les films a découvrir sur 
                    <span className="font-extralight text-5xl text-red-800">
                        Next
                    <span className="mask-linear-from-red-800 font-bold bg-red-800 text-white">
                        Watch
                    </span>
                    </span>
                </h1>
                {imageGroups.map((group, lineIndex) => (
                <motion.div
                        key={lineIndex}
                        className="flex gap-6"
                        animate={{
                        x: directions[lineIndex] === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
                    }}
                        transition={{
                        repeat: Infinity,
                        duration: 25,
                        ease: "linear",
                    }}
                >
                    {[...group, ...group].map((src, index) => (
                    <img
                        key={`${lineIndex}-${index}`}
                        src={src}
                        alt={`feature-${index}`}
                        className="w-[120px] h-[100px] object-cover rounded-xl shadow-md"
                    />
                    ))}
                </motion.div>
                ))}
            </div>
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-neutral-950 to-transparent z-3 pointer-events-none" />
    </div>
  );
};

export default MultiLineSlider;