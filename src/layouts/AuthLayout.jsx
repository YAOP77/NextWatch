import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Content from "../components/content";
import Footer from "../components/Footer"

function MobileMenu({ view, setView }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="sm:hidden relative">
            <button
                className="text-white bg-neutral-900 rounded-lg px-3 py-2 flex items-center gap-2"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
            >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-neutral-950 rounded-lg shadow-lg border border-neutral-800 animate-fade-in">
                    <ul>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-3 block transition ${view === "login" ? "text-red-700 font-extrabold" : "text-white"}`}
                                onClick={() => { setView("login"); setOpen(false); }}
                            >
                                Se connecter
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-3 block transition ${view === "register" ? "text-red-700 font-extrabold" : "text-white"}`}
                                onClick={() => { setView("register"); setOpen(false); }}
                            >
                                S'inscrire
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

const AuthLayout = () => {
    const [view, setView] = useState("register");

    return (
        <div className="auth-layout bg-neutral-950 h-152">
                        {/* <header className="auth-buttons z-10 fixed left-1/2 -translate-x-1/2 max-w-2xl w-full bg-transparent backdrop-blur-md flex items-center justify-between px-4 py-2 border-b border-neutral-950"></header> */}
            <header className="auth-buttons z-10 fixed w-full bg-transparent backdrop-blur-md flex items-center justify-between px-4 py-2 border-b border-neutral-950">
                <div>
                    <h1 className="text-3xl text-red-800 font-extralight"><a href="/">Next <span className="mask-linear-from-red-800 font-bold bg-red-800 text-white">Watch</span></a></h1>
                </div>
                {/* Menu desktop */}
                <div className="hidden sm:flex gap-4">
                    <button
                        className={`cursor-pointer transition px-3 py-1 rounded ${view === "login" ? "text-red-700  font-extrabold" : "text-white"}`}
                        onClick={() => setView("login")}
                    >
                        Se connecter
                    </button>
                    <button
                        className={`cursor-pointer transition px-3 py-1 rounded ${view === "register" ? "text-red-700  font-extrabold" : "text-white"}`}
                        onClick={() => setView("register")}
                    >
                        S'inscrire
                    </button>
                </div>
                {/* Menu mobile */}
                <MobileMenu view={view} setView={setView} />
            </header>
            <main>
                <div className="auth-content pt-20 max-w-screen overflow-hidden">
                    <AnimatePresence mode="wait">
                        {view === "login" ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Login />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="register"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Register />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div>
                    <Content/>
                    {/* <CardPayement /> */}
                </div>
                <div>
                    <Footer />
                </div>
            </main>
        </div>
    );
};
// ...existing code...

export default AuthLayout;