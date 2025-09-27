
import useAuth from "../../../hooks/useAuth";
import { LogOut, Menu, X, House, Film, Clock, Bookmark } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const UserHeader = ({ onSearch }) => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "2-digit" });
    } catch {
      return "—";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="flex flex-row justify-between items-center px-4 py-3 fixed top-0 left-0 right-0 bg-black z-50">
      {/* Logo ou titre */}
      <div className="flex items-center gap-2">
        <span className="font-extralight text-red-800 text-lg flex sm:text-2xl">Next <span className='bg-red-800 text-white font-bold ml-1'>Watch</span></span>
      </div>


      {/* Champ recherche toujours centré et visible */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher un film"
          className="border border-neutral-800 rounded-lg bg-transparent w-full max-w-xs text-white p-1 sm:p-2 placeholder:text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Desktop user zone */}
      <div className="hidden md:flex flex-row items-center gap-6">
        <p onClick={() => setUserModalOpen(true)} className="text-white w-21 font-bold h-10 flex flex-row items-center gap-2 cursor-pointer hover:opacity-90">
          { user.username } - {
            <span
              className={
                user.subscription === 'free' ? 'text-blue-600 font-bold'
                : user.subscription === 'weekly' ? 'text-red-600 font-bold'
                : user.subscription === 'monthly' ? 'text-orange-600 font-bold'
                : user.subscription === 'yearly' ? 'text-emerald-600 font-bold'
                : 'text-gray-400 font-bold'
              }
            >
              { user.subscription }
            </span>
          }
        </p>
        <button 
          className="text-red-700 cursor-pointer hover:text-red-900" 
          onClick={handleLogout}
        >
          <LogOut size={23} color="#f50000" strokeWidth={1.75} />
        </button>
      </div>

      {userModalOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setUserModalOpen(false)}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-white shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold">Informations du compte</h3>
              <button className="text-neutral-400 hover:text-white" onClick={() => setUserModalOpen(false)}>
                <X size={22} />
              </button>
            </div>
              <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-400">Nom d'utilisateur</span><span className="font-semibold">{user.username}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Formule</span><span className="font-semibold capitalize">{user.subscription}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Début d'abonnement</span><span className="font-semibold">{user.role === 'admin' ? 'Toujours actif' : formatDate(user.subscriptionStart)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Fin d'abonnement</span><span className="font-semibold">{user.role === 'admin' ? '—' : (["weekly","monthly","yearly"].includes(user.subscription) ? formatDate(user.subscriptionEnd) : "—")}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu button */}
      <button className="md:hidden text-white z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile menu (slide-in) */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: menuOpen ? '0 0 0 100vw rgba(0,0,0,0.5)' : 'none' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-between items-center px-4 py-4 border-b border-neutral-800">
            <span className="font-extralight text-red-800 text-xl flex sm:2xl">Next <span className='bg-red-800 text-white font-bold ml-1'>Watch</span></span>
          </div>
          <ul className="flex flex-col gap-2 mt-6 px-4">
            <li>
              <Link to="/movies" className="flex items-center gap-2 py-2 px-2 rounded hover:bg-neutral-900 transition" onClick={() => setMenuOpen(false)}>
                <House size={22} /> Accueil
              </Link>
            </li>
            <li>
              <Link to="/movies/premium" className="flex items-center gap-2 py-2 px-2 rounded hover:bg-neutral-900 transition" onClick={() => setMenuOpen(false)}>
                <Film size={22} /> Premium
              </Link>
            </li>
            <li>
              <Link to="/watch-later" className="flex items-center gap-2 py-2 px-2 rounded hover:bg-neutral-900 transition" onClick={() => setMenuOpen(false)}>
                <Clock size={22} /> Plus-tard
              </Link>
            </li>
            <li>
              <Link to="/favoris" className="flex items-center gap-2 py-2 px-2 rounded hover:bg-neutral-900 transition" onClick={() => setMenuOpen(false)}>
                <Bookmark size={22} /> Favoris
              </Link>
            </li>
          </ul>
          <div className="mt-auto px-4 pb-6 flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 text-white cursor-pointer" onClick={() => { setMenuOpen(false); setUserModalOpen(true); }}>
              <span className="font-bold">{user.username}</span> -
              <span
                className={
                  user.subscription === 'free' ? 'text-blue-600 font-bold'
                  : user.subscription === 'weekly' ? 'text-red-600 font-bold'
                  : user.subscription === 'monthly' ? 'text-orange-600 font-bold'
                  : user.subscription === 'yearly' ? 'text-emerald-600 font-bold'
                  : 'text-gray-400 font-bold'
                }
              >
                {user.subscription}
              </span>
            </div>
            <button
              className="text-red-700 cursor-pointer hover:text-red-900 flex items-center gap-2 mt-2"
              onClick={handleLogout}
            >
              <LogOut size={20} color="#f50000" strokeWidth={1.75} /> Déconnexion
            </button>
            <button className="absolute top-4 right-4 text-white md:hidden" onClick={() => setMenuOpen(false)}><X size={28} /></button>
          </div>
        </div>
      </nav>
      {/* Overlay pour fermer le menu en cliquant à côté */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30" onClick={() => setMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default UserHeader;