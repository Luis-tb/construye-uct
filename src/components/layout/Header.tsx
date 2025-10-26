import {useEffect, useState} from "react";
import {LogIn, LogOut, MapPin, Menu, X} from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import {supabase} from "@/lib/supabaseClient";
import {motion} from "framer-motion";
import { ROUTES } from "@/config/routes";
import { useLoginModalStore } from "@/components/auth/store/useLoginModalStore";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const navigate = useNavigate();
    const openLoginModal = useLoginModalStore((state) => state.open);
    const closeLoginModal = useLoginModalStore((state) => state.close);

    // Verificar sesión y escuchar cambios
    useEffect(() => {
        const checkUser = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        void checkUser();

        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            const loggedIn = !!session;
            setIsAuthenticated(loggedIn);

            // 💡 MEJORA: Cuando el usuario inicia sesión, cerramos el modal desde aquí.
            if (event === "SIGNED_IN") {
                closeLoginModal();
            }

            if (event === "SIGNED_OUT") {
                navigate("/");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate, closeLoginModal]);

    // Cerrar sesión
    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) console.error("Error al cerrar sesión:", error.message);
        else {
            console.log("✅ Sesión cerrada");
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
                    <LogOut className="h-4 w-4 mr-1"/>
                    Cerrar Sesión
                </button>
            );
        }

        return (
            <button
                onClick={openLoginModal} // 👈 Simplemente llamamos a la acción del store
                className="flex items-center text-sm font-medium text-white bg-blue-600 py-2 px-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Iniciar Sesión"
            >
                <LogIn className="h-4 w-4 mr-1"/>
                Iniciar Sesión
            </button>
        );
    };

    return (
        <>
            {/* 💡 MEJORA: Añadimos un borde inferior sutil y un fondo ligeramente translúcido para un efecto moderno */}
            <header
                className="sticky top-0 z-50 text-black bg-white/80 backdrop-blur-lg border-b border-gray-200/80 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <NavLink to="/" className="flex items-center space-x-3 text-black">
                            {/* 💡 MEJORA: Reducimos el tamaño del logo para un header más limpio */}
                            <img src="/logo-large.svg" alt="Logo" className="h-12 w-auto"/>
                        </NavLink>

                        {/* Navegación Desktop */}
                        <div className="hidden xl:flex items-center space-x-6">
                            <nav className="flex items-center space-x-1">
                                {/* 💡 MEJORA: Usamos NavLink para estilizar la ruta activa */}
                                {[
                                    { to: ROUTES.HOME, label: "Inicio" },
                                    { to: ROUTES.PROBLEMS_SOLUTIONS, label: "Problemas Comunes" },
                                    { to: ROUTES.PROFESSIONALS, label: "Profesionales" },
                                    { to: ROUTES.TIPS, label: "Consejos" },
                                    { to: ROUTES.CALCULATOR, label: "Calculadora" },
                                ].map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        // La función en `className` nos da `isActive` para saber si el link está activo
                                        className={({isActive}) =>
                                            `relative text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                                                isActive
                                                    ? "text-blue-600 bg-blue-50"
                                                    : "text-slate-600 hover:bg-gray-100 hover:text-black"
                                            }`
                                        }
                                    >
                                        {({isActive}) => (
                                            <>
                                                {item.label}
                                                {/* 💡 MEJORA: Añadimos un punto animado debajo del item activo */}
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
                                    <MapPin className="h-4 w-4 text-slate-500"/>
                                    <span className="text-sm">Perú</span>
                                </div>

                                <AuthButton/>


                            </div>
                        </div>

                        {/* Botón menú móvil */}
                        <div className="xl:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
                                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                            </button>
                        </div>
                    </div>

                    {/* Menú móvil */}
                    {isMenuOpen && (
                        <div className="xl:hidden bg-white pb-4">
                            <nav className="flex flex-col items-center space-y-4">
                                <NavLink to="/" className="text-sm font-medium text-slate-600 hover:text-black"
                                         onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
                                <NavLink to="/guias" className="text-sm font-medium text-slate-600 hover:text-black"
                                         onClick={() => setIsMenuOpen(false)}>Guías</NavLink>
                                <NavLink to="/calculadora"
                                         className="text-sm font-medium text-slate-600 hover:text-black"
                                         onClick={() => setIsMenuOpen(false)}>Calculadora</NavLink>
                                <NavLink
                                    to="/profesionales"
                                    className="text-sm font-medium text-slate-600 hover:text-black"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profesionales
                                </NavLink>

                                {/* Botones dinámicos */}
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => {
                                            void handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 py-2 rounded-md transition-colors cursor-pointer"
                                    >
                                        <LogOut className="h-4 w-4 inline-block mr-2"/>
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            openLoginModal();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition-colors cursor-pointer"
                                    >
                                        <LogIn className="h-4 w-4 inline-block mr-2"/>
                                        Iniciar Sesión
                                    </button>
                                )}

                            </nav>
                        </div>
                    )}
                </div>
            </header>

        </>
    );
}
