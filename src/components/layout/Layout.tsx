import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/ChatBot";
import LoginModal from "@/components/auth/LoginModal";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoginModalStore } from "@/components/auth/store/useLoginModalStore";

export default function Layout() {
    const location = useLocation();
    const { user, loading } = useAuth();
    const { open: openLoginModal } = useLoginModalStore();

    // Abrir el modal de login al cargar la página si el usuario no está autenticado.
    useEffect(() => {
        const timer = setTimeout(() => {
            // Obtenemos el estado más reciente del store para evitar problemas con closures.
            const { isOpen } = useLoginModalStore.getState();

            // La condición para abrir el modal es:
            // 1. La autenticación no está cargando.
            // 2. No hay un usuario logueado.
            // 3. El modal no está ya abierto.
            // 4. No estamos en una redirección de OAuth.
            if (!loading && !user && !isOpen && !location.hash.includes("access_token")) {
                openLoginModal();
            }
        }, 1500);

        return () => clearTimeout(timer);

        // Eliminamos `isOpen` de las dependencias para evitar que el efecto se
        // vuelva a ejecutar cuando el modal se cierra.
    }, [user, loading, openLoginModal, location.hash]);


    // Scroll a ancla seguro
    const AppScrollManager = () => {
        useEffect(() => {
            if (location.hash && !location.hash.includes("access_token")) {
                const el = document.querySelector(location.hash);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else window.scrollTo(0, 0);
            } else {
                window.scrollTo(0, 0);
            }
        }, [location.hash]);
        return null;
    };

    return (
        <div className="bg-background flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <AppScrollManager />
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
            <LoginModal />
        </div>
    );
}
