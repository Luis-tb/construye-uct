import {Badge} from "@/components/ui/badge.tsx";
import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, ChevronRight, Loader2} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCategorias} from "@/hooks/useCategorias.ts";
import {ROUTES} from "@/config/routes.ts";

export default function Categorias() {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const onNavigate = useNavigate()
    const {categorias, loading, error} = useCategorias({withProblemCount: true});

    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600"/>
            </div>;
        }

        if (error) {
            return <div className="text-center text-red-600">Error al cargar las categorías: {error}</div>;
        }
        // Objeto que mapea IDs de categorías a clases de Tailwind
        const categoryColorMap: { [key: string]: string } = {
            'electricidad': 'from-yellow-500 to-yellow-600',
            'plomeria': 'from-blue-500 to-blue-600',
            'techos': 'from-red-500 to-red-600',
            'cimientos': 'from-orange-500 to-orange-600',
            'marmol': 'from-slate-400 to-slate-500',
            'paredes': 'from-purple-500 to-purple-600',
            'pisos': 'from-stone-500 to-stone-600',
        };
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categorias.map((category, index) => {
                    const Icon = category.icono;
                    return (
                        <motion.div
                            key={category.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <Card
                                className="cursor-pointer transition-all hover:shadow-xl group overflow-hidden h-full"
                                onClick={() => onNavigate(ROUTES.PROBLEMS_SOLUTIONS + `?catId=${category.id}`)}
                            >
                                <CardContent className="p-6">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-br ${categoryColorMap[category.id]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon className="w-8 h-8 text-white"/>
                                    </div>
                                    <h3 className="text-gray-900 mb-2">{category.nombre}</h3>
                                    <p className="text-gray-600 mb-3">{category.descripcion_breve}</p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary">
                                            {category.problems || 0} problemas
                                        </Badge>
                                        <ChevronRight
                                            className={`w-5 h-5 text-gray-400 transition-transform ${
                                                hoveredCategory === category.id ? "translate-x-1" : ""
                                            }`}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        );
    }

    return <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge className="mb-4">Problemas Comunes</Badge>
                <h2 className="mb-3 text-gray-900">
                    Encuentra soluciones por categoría
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Tenemos experiencia resolviendo todo tipo de problemas del hogar. Explora
                    por categoría y encuentra la ayuda que necesitas.
                </p>
            </div>

            {renderContent()}

            <div className="text-center mt-8">
                <Button size="lg" onClick={() => onNavigate(ROUTES.PROBLEMS_SOLUTIONS)}>
                    Ver todos los problemas
                    <ArrowRight className="w-4 h-4 ml-2"/>
                </Button>
            </div>
        </div>
    </section>
}