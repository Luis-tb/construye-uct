import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient.ts";
import {
    ArrowLeft,
    Clock,
    Eye,
    Star,
    Bookmark,
    Share2,
    User,
    Calendar,
    Lightbulb,
    Loader2,
    AlertTriangle,
} from "lucide-react";

// Importaciones de datos y tipos
// 💡 CORRECCIÓN: Ya no usamos el archivo local, ahora solo necesitamos el tipo.
import type { TipDetail } from './tip-data';

// Importaciones de subcomponentes y UI
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";
import { TipSection } from './components/TipSection';
import { ROUTES, createPath } from "@/config/routes.ts";

// Interfaz para el resultado combinado de la consulta
type FullArticle = TipDetail & {
    // Estos campos vienen de la tabla 'articulos'
    rating: number;
    category: { nombre: string }; // 💡 MEJORA: Esperamos el objeto completo de la categoría
    views: string;
};

// --- COMPONENTE CONTENEDOR (NUEVO) ---
// Este componente se encarga de la lógica de routing.

export default function TipDetailPageContainer() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Si no hay ID en la URL, redirigimos a la página principal de consejos.
    if (!id) {
        return <Navigate to={ROUTES.TIPS} replace />;
    }

    // Función de navegación que el componente de presentación puede usar.
    const handleNavigate = (pathKey: keyof typeof ROUTES, params?: Record<string, string | number>) => {
        navigate(createPath(pathKey, params));
    };

    return <TipDetailPagePresentation tipId={id} onNavigate={handleNavigate} />;
}


// --- COMPONENTE DE PRESENTACIÓN ---
// Este es tu componente original, ahora renombrado para mayor claridad.

interface TipDetailPageProps {
    tipId: string;
    onNavigate: (pathKey: keyof typeof ROUTES, params?: Record<string, string | number>) => void;
}

const getDifficultyColor = (difficulty: TipDetail["difficulty"]): string => {
    switch (difficulty) {
        case "Fácil":
            return "bg-green-100 text-green-700";
        case "Intermedio":
            return "bg-yellow-100 text-yellow-700";
        case "Avanzado":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

function TipDetailPagePresentation({ tipId, onNavigate }: TipDetailPageProps) {
    // 💡 MEJORA: Usamos useQuery para obtener el artículo y sus detalles desde Supabase.
    const { data: tip, isLoading, error } = useQuery<FullArticle>({
        queryKey: ['tipDetail', tipId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('articulos')
                .select(`
                    *,
                    category:categorias ( nombre ),
                    articulo_detalles (
                        *
                    )
                `)
                .eq('id', tipId)
                .single();

            if (error) throw new Error(`Artículo con ID ${tipId} no encontrado.`);

            // Combinamos los datos en un solo objeto plano para facilitar su uso
            const { articulo_detalles, category_id, ...articleData } = data;
            return { ...articleData, ...articulo_detalles, category_id }; // Mantenemos category_id por si se usa en otro lado
        },
        enabled: !!tipId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error || !tip) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
                <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {error ? "Error al cargar" : "Artículo no encontrado"}
                </h2>
                <p className="text-gray-600 mb-6">El consejo que buscas no existe o ha sido movido.</p>
                <Button onClick={() => onNavigate('TIPS')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a todos los consejos
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <Button
                    variant="ghost"
                    className="mb-6 text-gray-600 hover:text-gray-900"
                    onClick={() => onNavigate('TIPS')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a consejos
                </Button>

                <div className="max-w-4xl mx-auto">
                    {/* Hero Image & Title */}
                    <div className="relative h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
                        <ImageWithFallback
                            src={tip.image}
                            alt={tip.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                            <div className="p-8 text-white w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge className="bg-blue-600 text-white">
                                        {tip.category?.nombre || 'Categoría'}
                                    </Badge>
                                    <Badge className={getDifficultyColor(tip.difficulty)}>
                                        {tip.difficulty}
                                    </Badge>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-3">{tip.title}</h1>
                                <div className="flex items-center gap-4 text-blue-100 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{tip.readTime}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        <span>{tip.views} vistas</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{tip.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Author & Actions */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{tip.author || 'Equipo Construye'}</p>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar className="w-3 h-3" />
                                            <span>{tip.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" aria-label="Guardar">
                                        <Bookmark className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" aria-label="Compartir">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Introduction */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-3 text-gray-900">Introducción</h2>
                            <p className="text-gray-700 leading-relaxed">{tip.introduction}</p>
                        </CardContent>
                    </Card>

                    {/* Materials & Tools */}
                    {(tip.materials?.length > 0 || tip.tools?.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {tip.materials?.length > 0 && (
                                <TipSection
                                    title="Materiales necesarios"
                                    items={tip.materials}
                                    type="materials"
                                />
                            )}
                            {tip.tools?.length > 0 && (
                                <TipSection
                                    title="Herramientas requeridas"
                                    items={tip.tools}
                                    type="tools"
                                />
                            )}
                        </div>
                    )}

                    {/* Steps */}
                    {tip.steps?.length > 0 && (
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6 text-gray-900">Paso a paso</h2>
                                <div className="space-y-8">
                                    {tip.steps.map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                                    {step.number}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                                                <p className="text-gray-700 mb-3 leading-relaxed">
                                                    {step.description}
                                                </p>
                                                {step.tip && (
                                                    <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded">
                                                        <div className="flex items-start gap-2">
                                                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                            <p className="text-sm text-blue-900">
                                                                <strong>Consejo:</strong> {step.tip}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Warnings */}
                    {tip.warnings?.length > 0 && (
                        <div className="mb-6">
                            <TipSection
                                title="Advertencias importantes"
                                items={tip.warnings}
                                type="warnings"
                            />
                        </div>
                    )}

                    {/* Pro Tips */}
                    {tip.proTips?.length > 0 && (
                        <div className="mb-6">
                            <TipSection
                                title="Consejos profesionales"
                                items={tip.proTips}
                                type="proTips"
                            />
                        </div>
                    )}

                    {/* Related Problems */}
                    {tip.relatedProblems?.length > 0 && (
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Problemas relacionados</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tip.relatedProblems.map((problem, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            // 💡 MEJORA: Navega a la página general de problemas, ya que no tenemos un ID de problema específico aquí.
                                            onClick={() => onNavigate("PROBLEMS_SOLUTIONS")}
                                        >
                                            {problem}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* CTA */}
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">¿Necesitas ayuda profesional?</h3>
                            <p className="text-gray-600 mb-4">
                                Si el problema es más complejo, conecta con un profesional certificado
                            </p>
                            <Button size="lg" onClick={() => onNavigate('PROFESSIONALS')}>
                                Buscar Profesionales
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
