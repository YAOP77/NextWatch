const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1 - Logo / Description */}
        <div>
          <h2 className="text-5xl text-red-800 font-extralight">Next <span className="bg-red-800 text-white font-bold mask-linear-from-red-800">Watch</span></h2>
          <p className="mt-3 text-sm text-neutral-400">
            La meilleure expérience de streaming : films, séries et
            téléchargements disponibles chaque semaine.
          </p>
        </div>

        {/* Col 2 - Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-neutral-300 items-start">
            <li><a href="#" className="hover:text-red-700">Accueil</a></li>
            <li><a href="#" className="hover:text-red-700">Offres</a></li>
            <li><a href="#" className="hover:text-red-700">FAQ</a></li>
            <li><a href="#" className="hover:text-red-700">Contact</a></li>
          </ul>
        </div>

        {/* Col 3 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-neutral-300">
            <li>Email : <a href="mailto:yaoyaopascal77@gmail.com" className="hover:text-red-700">yaopascal91@gmail.com</a></li>
            {/* <li>Tél : <a href="tel:+2250700000000" className="hover:text-red-700">+225 01 73 24 32 48</a></li> */}
          </ul>
        </div>

        {/* Col 4 - Réseaux sociaux */}
        <div>
          <h3 className="flex items-center text-lg font-semibold mb-3">Suivez-moi</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/YAOP77" target="_blank" rel="noreferrer" className="hover:text-red-700">GitHub</a>
            <a href="https://www.linkedin.com/in/pascal-yao-464993308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer" className="hover:text-red-700">LinkedIn</a>
            {/* <a href="https://twitter.com/yaopascal" target="_blank" rel="noreferrer" className="hover:text-red-700">Twitter</a> */}
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-neutral-800 mt-8 pt-5 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} NextWatch — Développé par{" "}
        <span className="text-red-700 font-semibold">Pascal Yao</span>
      </div>
    </footer>
  );
}

export default Footer;