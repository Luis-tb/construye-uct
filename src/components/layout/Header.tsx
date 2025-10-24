import { useState, useEffect } from "react";
import { MapPin, Menu, X, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import LoginModal from "@/components/auth/LoginModal";
import { MessageCircle } from "lucide-react";

interface HeaderProps {
    onChatbotToggle?: () => void;
}

export default function Header({ onChatbotToggle }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    // Verificar sesión y escuchar cambios
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        void checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            const loggedIn = !!session;
            setIsAuthenticated(loggedIn);

            if (event === "SIGNED_OUT") {
                navigate("/");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    // Cerrar sesión
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error al cerrar sesión:", error.message);
        else {
            console.log("✅ Sesión cerrada");
            setIsLoginModalOpen(false);
            navigate("/");
        }
    };

    // Botón login/logout
    const AuthButton = () => {
        if (isAuthenticated === undefined) return null;

        if (isAuthenticated) {
            return (
                <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-white bg-red-600 py-2 px-3 rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300 cursor-pointer"
                    title="Cerrar Sesión"
                >
                    <LogOut className="h-4 w-4 mr-1" />
                    Cerrar Sesión
                </button>
            );
        }

        return (
            <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center text-sm font-medium text-white bg-blue-600 py-2 px-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Iniciar Sesión"
            >
                <LogIn className="h-4 w-4 mr-1" />
                Iniciar Sesión
            </button>
        );
    };

    return (
        <>
            <header className="sticky top-0 z-50 text-black shadow-lg bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 text-black">
                            <img src="/logo-large.svg" alt="Logo" className="h-16 w-64" />
                        </Link>

                        {/* Navegación Desktop */}
                        <div className="hidden md:flex items-center space-x-6">
                            <nav className="flex items-center space-x-1">
                                <Link
                                    to="/"
                                    className="text-sm font-medium text-slate-600 px-5 py-2 rounded-xl transition-all duration-300 hover:bg-gray-200 hover:text-black"
                                >
                                    Inicio
                                </Link>
                                <Link
                                    to="/guias"
                                    className="text-sm font-medium text-slate-600 px-5 py-2 rounded-xl transition-all duration-300 hover:bg-gray-200 hover:text-black"
                                >
                                    Guías
                                </Link>
                                <Link
                                    to="/calculadora"
                                    className="text-sm font-medium text-slate-600 px-5 py-2 rounded-xl transition-all duration-300 hover:bg-gray-200 hover:text-black"
                                >
                                    Calculadora
                                </Link>
                                <Link
                                    to="/profesionales"
                                    className="text-sm font-medium text-slate-600 px-5 py-2 rounded-xl transition-all duration-300 hover:bg-gray-200 hover:text-black"
                                >
                                    Profesionales
                                </Link>

                            </nav>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">Perú</span>
                                </div>

                                {/* Botón Chatbot */}
                                {onChatbotToggle && (
                                    <button
                                        onClick={onChatbotToggle}
                                        className="flex items-center text-sm text-white font-medium bg-gray-700 py-2 px-3 rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer"
                                        title="Abrir Chatbot"
                                    >
                                        <MessageCircle className="h-4 w-4 mr-1" />
                                        AI Assistant
                                    </button>
                                )}

                                <AuthButton />


                            </div>
                        </div>

                        {/* Botón menú móvil */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Menú móvil */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-[#022867] pb-4">
                            <nav className="flex flex-col items-center space-y-4">
                                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                                <Link to="/guias" className="text-sm font-medium text-slate-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>Guías</Link>
                                <Link to="/calculadora" className="text-sm font-medium text-slate-600 hover:text-black" onClick={() => setIsMenuOpen(false)}>Calculadora</Link>
                                <Link
                                    to="/profesionales"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profesionales
                                </Link>

                                {/* Botones dinámicos */}
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => { void handleLogout(); setIsMenuOpen(false); }}
                                        className="w-full text-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 py-2 rounded-md transition-colors cursor-pointer"
                                    >
                                        <LogOut className="h-4 w-4 inline-block mr-2" />
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }}
                                        className="w-full text-center text-sm font-medium text-white bg-[#022867] hover:bg-[#0340a3] py-2 rounded-md transition-colors cursor-pointer"
                                    >
                                        <LogIn className="h-4 w-4 inline-block mr-2" />
                                        Iniciar Sesión
                                    </button>
                                )}


                                {/* Botón Chatbot móvil */}
                                {onChatbotToggle && (
                                    <button
                                        onClick={() => { onChatbotToggle(); setIsMenuOpen(false); }}
                                        className="w-full text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition-colors"
                                    >
                                        💬 Chat
                                    </button>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Modal Login */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
}
