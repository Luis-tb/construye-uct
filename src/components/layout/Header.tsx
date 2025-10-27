import { useEffect, useState } from "react";
import { LogIn, LogOut, MapPin, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { useLoginModalStore } from "@/components/auth/store/useLoginModalStore";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const navigate = useNavigate();
    const openLoginModal = useLoginModalStore((state) => state.open);
    const closeLoginModal = useLoginModalStore((state) => state.close);

    // --- Verificar sesión y escuchar cambios ---
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        void checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            const loggedIn = !!session;
            setIsAuthenticated(loggedIn);

            if (event === "SIGNED_IN") closeLoginModal();
            if (event === "SIGNED_OUT") navigate("/");
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate, closeLoginModal]);

    // --- Cerrar sesión ---
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error al cerrar sesión:", error.message);
        else navigate("/");
    };

    // --- Botón login/logout ---
    const AuthButton = () => {
        if (isAuthenticated === undefined) return null;

        if (isAuthenticated) {
            return (
                <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-white bg-red-600 py-2 px-3 rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300"
                >
                    <LogOut className="h-4 w-4 mr-1" />
                    Cerrar Sesión
                </button>
            );
        }

        return (
            <button
                onClick={openLoginModal}
                className="flex items-center text-sm font-medium text-white bg-blue-600 py-2 px-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
                <LogIn className="h-4 w-4 mr-1" />
                Iniciar Sesión
            </button>
        );
    };

    // --- Menú principal (reutilizable) ---
    const menuItems = [
        { to: ROUTES.HOME, label: "Inicio" },
        { to: ROUTES.PROBLEMS_SOLUTIONS, label: "Problemas Comunes" },
        { to: ROUTES.PROFESSIONALS, label: "Profesionales" },
        { to: ROUTES.TIPS, label: "Consejos" },
        { to: ROUTES.CALCULATOR, label: "Calculadora" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-3 text-black">
                        <img src="/logo-large.svg" alt="Logo" className="h-12 w-auto" />
                    </NavLink>

                    {/* Navegación Desktop */}
                    <div className="hidden xl:flex items-center space-x-6">
                        <nav className="flex items-center space-x-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `relative text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                                            isActive
                                                ? "text-blue-600 bg-blue-50"
                                                : "text-slate-600 hover:bg-gray-100 hover:text-black"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {item.label}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 bg-blue-600 rounded-full"
                                                    layoutId="active-nav-dot"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="text-sm">Perú</span>
                            </div>
                            <AuthButton />
                        </div>
                    </div>

                    {/* Botón menú móvil */}
                    <div className="xl:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Menú Móvil flotante compacto (solo móviles) --- */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm sm:hidden"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        // 💡 Flotante más pequeño y discreto
                        className="absolute top-16 right-3 bg-white/95 border border-gray-200 shadow-xl rounded-xl p-3 w-44 flex flex-col space-y-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón X */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-500 hover:text-black transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Enlaces */}
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-center text-xs font-medium py-1.5 rounded-md transition-colors ${
                                        isActive
                                            ? "text-blue-600 bg-blue-50"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {/* Botones dinámicos */}
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    void handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 py-1.5 rounded-md transition-colors"
                            >
                                <LogOut className="h-3.5 w-3.5 inline-block mr-1" />
                                Salir
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    openLoginModal();
                                    setIsMenuOpen(false);
                                }}
                                className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 py-1.5 rounded-md transition-colors"
                            >
                                <LogIn className="h-3.5 w-3.5 inline-block mr-1" />
                                Iniciar Sesión
                            </button>
                        )}
                    </motion.div>
                </div>
            )}

        </header>
    );
}
