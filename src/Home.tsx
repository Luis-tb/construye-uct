import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { problemas, categorias } from "@/lib/data";
import HeroSection from "@/components/guide/HeroSection";
import Categories from "@/components/guide/Categories";
import ProblemList from "@/components/guide/ProblemList";
import EmergencyContact from "@/components/guide/EmergencyContact";
import LoginModal from "@/components/auth/LoginModal";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function Home() {
    const { user } = useSupabaseAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        // Espera un poco para que supabase termine de validar sesión antes de decidir
        const timer = setTimeout(() => {
            if (user === null) setIsLoginModalOpen(true);
            else if (user) setIsLoginModalOpen(false);
        }, 300); // pequeño delay suave
        return () => clearTimeout(timer);
    }, [user]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("todos");

    const problemasFiltrados = problemas.filter((problema) => {
        const matchesSearch =
            problema.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problema.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "todos" || problema.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-background relative min-h-screen">
            {/* ✨ Modal con fade moderno */}
            <AnimatePresence>
                {isLoginModalOpen && (
                    <motion.div
                        key="loginModal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center
                       bg-[#022867]/20 backdrop-blur-md"
                        onClick={() => setIsLoginModalOpen(false)} // 👈 clic en el overlay
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()} // 👈 evita que el clic en el modal cierre
                        >
                            <LoginModal
                                isOpen={isLoginModalOpen}
                                onClose={() => setIsLoginModalOpen(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Categories
                categorias={categorias}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ProblemList problemas={problemasFiltrados} />
            <EmergencyContact />
        </div>
    );
}
