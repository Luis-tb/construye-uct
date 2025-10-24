import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Categories from "@/components/guide/Categories";
import ProblemList from "@/components/guide/ProblemList";
import HeroSection from "@/components/guide/HeroSection";
import EmergencyContact from "@/components/guide/EmergencyContact";
import LoginModal from "@/components/auth/LoginModal";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/lib/supabaseClient";
import type { Categoria, Problema } from "@/types";

// ⚠️ CAMBIO CLAVE AQUÍ ⚠️
// Importa todos los componentes de Lucide como un solo objeto.
import * as LucideIcons from "lucide-react";
// Importa 'Home' específicamente para usarlo como fallback (opcional, pero buena práctica).
import { Home as HomeIcon } from "lucide-react";

export default function Home() {
    const { user } = useSupabaseAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("todos");
    const [problemas, setProblemas] = useState<Problema[]>([]);

    // Modal login
    useEffect(() => {
        const timer = setTimeout(() => setIsLoginModalOpen(user === null), 300);
        return () => clearTimeout(timer);
    }, [user]);

    // Traer categorías y problemas
    useEffect(() => {
        (async () => {
            try {
                const { data: categoriasData, error: catError } = await supabase
                    .from("categorias")
                    .select("*");
                if (catError) console.error("Error categorías:", catError);

                const { data: problemasData, error: probError } = await supabase
                    .from("problemas")
                    .select("*");
                if (probError) console.error("Error problemas:", probError);

                // Mapear categorías
                const mappedCategorias = (categoriasData || []).map(cat => {
                    // 🚀 Accede al componente de icono de Lucide dinámicamente usando el string de Supabase.
                    // Si el nombre no existe, usa 'HomeIcon' como fallback.
                    const IconComponent = LucideIcons[cat.icono as keyof typeof LucideIcons] || HomeIcon;

                    return {
                        ...cat,
                        icono: IconComponent, // Asigna el componente encontrado
                        descripcionBreve: cat.descripcion_breve || "",
                        problemasCount: (problemasData || []).filter(p => p.categoria_id === cat.id).length || 0
                    };
                });


                setCategorias(mappedCategorias);

                // Mapear problemas
                const mappedProblemas: Problema[] = (problemasData || []).map(p => ({
                    id: p.id,
                    categoria: p.categoria_id,
                    titulo: p.nombre,
                    descripcion: p.descripcion,
                    solucion: p.solucion || "",
                    costo: p.costo || "",
                    tiempo: p.tiempo || "",
                    dificultad: p.dificultad || "Media",
                    prevencion: p.prevencion || ""
                }));

                setProblemas(mappedProblemas);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    // Filtrar problemas por búsqueda y categoría
    const problemasFiltrados = problemas.filter(problema => {
        const matchesSearch =
            problema.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problema.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "todos" || problema.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-background relative min-h-screen">
            <AnimatePresence>
                {isLoginModalOpen && (
                    <motion.div
                        key="loginModal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#022867]/20 backdrop-blur-md"
                        onClick={() => setIsLoginModalOpen(false)}
                    >
                        <motion.div onClick={e => e.stopPropagation()}>
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