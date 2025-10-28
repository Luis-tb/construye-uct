import { useState } from "react";
import { LogIn, LogOut, MapPin, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/hooks/useAuth";
import { useLoginModalStore } from "@/components/auth/store/useLoginModalStore";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const { open: openLoginModal } = useLoginModalStore();
    const isAuthenticated = !!user;

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
                    <NavLink to="/" className="flex items-center space-x-3 text-black">
                        <img src="/logo-large.svg" alt="Logo" className="h-12 w-auto" />
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center space-x-6">
                        <nav className="flex items-center space-x-1">
                            {menuItems.map(item => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `relative text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                                            isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-gray-100 hover:text-black"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="text-sm">Perú</span>
                            </div>
                            {isAuthenticated ? (
                                <button
                                    onClick={() => void signOut()}
                                    className="flex items-center text-sm font-medium text-white bg-red-600 py-2 px-3 rounded-lg hover:bg-red-700 transition-all"
                                >
                                    <LogOut className="h-4 w-4 mr-1" /> Cerrar Sesión
                                </button>
                            ) : (
                                <button
                                    onClick={openLoginModal}
                                    className="flex items-center text-sm font-medium text-white bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-700 transition-all"
                                >
                                    <LogIn className="h-4 w-4 mr-1" /> Iniciar Sesión
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="xl:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm sm:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div className="absolute top-16 right-3 bg-white/95 border border-gray-200 shadow-xl rounded-xl p-3 w-44 flex flex-col space-y-2">
                        {menuItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-center text-xs font-medium py-1.5 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {isAuthenticated ? (
                            <button onClick={() => { void signOut(); setIsMenuOpen(false); }} className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 py-1.5 rounded-md">
                                <LogOut className="h-3.5 w-3.5 inline-block mr-1" /> Salir
                            </button>
                        ) : (
                            <button onClick={() => { openLoginModal(); setIsMenuOpen(false); }} className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 py-1.5 rounded-md">
                                <LogIn className="h-3.5 w-3.5 inline-block mr-1" /> Iniciar Sesión
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
