import {Outlet, useLocation} from "react-router-dom";
import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";
import Chatbot from "@/components/chatbot/ChatBot.tsx";
import {useEffect} from "react";
import LoginModal from "@/components/auth/LoginModal.tsx";
import {useSupabaseAuth} from "@/hooks/useSupabaseAuth.ts";
import {useLoginModalStore} from "@/components/auth/store/useLoginModalStore"

/**
 * Componente de ayuda para gestionar efectos globales de la aplicación,
 * como el scroll en el cambio de ruta.
 */
function AppScrollManager() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [location]);
    return null;
}

export default function Layout() {
    const {user} = useSupabaseAuth();
    const openLoginModal = useLoginModalStore((state) => state.open);
    const closeLoginModal = useLoginModalStore((state) => state.close);
    // Modal login
    useEffect(() => {
        if (user === null) openLoginModal()
        else closeLoginModal();
    }, [closeLoginModal, openLoginModal, user]);

    return (
        <div className="bg-background">
            <Header/>
            <main>
                <AppScrollManager/>
                <Outlet/>
            </main>
            <Footer/>
            <Chatbot/>
            <LoginModal/>
        </div>
    );
}
