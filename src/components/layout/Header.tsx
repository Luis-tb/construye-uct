import { useState, useEffect } from "react";
import { MapPin, Menu, X, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import LoginModal from "@/components/auth/LoginModal"; // asegúrate de la ruta correcta

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    // 🧠 Verificar sesión actual y escuchar cambios de autenticación
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
                navigate("/"); // 👈 redirige al Home al cerrar sesión
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    // 🚪 Cerrar sesión
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error al cerrar sesión:", error.message);
        } else {
            console.log("✅ Sesión cerrada");
            setIsLoginModalOpen(false);
            navigate("/"); // Redirigir manualmente por seguridad
        }
    };

    // ✨ Botón dinámico (login/logout)
    const AuthButton = () => {
        if (isAuthenticated === undefined) return null; // mientras carga, no mostrar nada

        if (isAuthenticated) {
            return (
                <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md transition-colors"
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
                className="flex items-center text-sm font-medium bg-white/10 hover:bg-white/20 py-2 px-3 rounded-md transition-colors"
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

                        {/* Navegación */}
                        <div className="flex items-center space-x-6">
                            <nav className="hidden md:flex items-center space-x-6">
                                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-black">
                                    Inicio
                                </Link>
                                <Link to="/guias" className="text-sm font-medium text-slate-600 hover:text-black">
                                    Guías
                                </Link>
                                <Link
                                    to="/calculadora"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                >
                                    Calculadora
                                </Link>
                                <Link
                                    to="/profesionales"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                >
                                    Profesionales
                                </Link>
                            </nav>

                            <div className="hidden md:flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">Perú</span>
                                </div>

                                {/* 👇 Botón dinámico */}
                                <AuthButton />
                            </div>

                            {/* Botón menú móvil */}
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Menú móvil */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-[#022867] pb-4">
                            <nav className="flex flex-col items-center space-y-4">
                                <Link
                                    to="/"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Inicio
                                </Link>
                                <Link
                                    to="/guias"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Guías
                                </Link>
                                <Link
                                    to="/calculadora"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Calculadora
                                </Link>
                                <Link
                                    to="/profesionales"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profesionales
                                </Link>

                                {/* Botón móvil dinámico */}
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => {
                                            void handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-center text-sm font-medium text-black bg-red-600 hover:bg-red-700 py-2 rounded-md transition-colors"
                                    >
                                        <LogOut className="h-4 w-4 inline-block mr-2" />
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsLoginModalOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-center text-sm font-medium text-black bg-white/10 hover:bg-white/20 py-2 rounded-md transition-colors"
                                    >
                                        <LogIn className="h-4 w-4 inline-block mr-2" />
                                        Iniciar Sesión
                                    </button>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* 🔒 Modal de Login */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
}
