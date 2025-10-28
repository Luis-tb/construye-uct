import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import type { Guia } from "@/types.ts";
import { BookOpen, Video, ListChecks, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";

interface ProblemGuidesProps {
    guias: Guia[];
}

/**
 * Retorna un componente de icono de Lucide React basado en el tipo de guía.
 * @param tipo El tipo de guía (e.g., 'articulo', 'video', 'pasos').
 * @returns Un componente de icono.
 */
const getGuideIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
        case 'articulo':
            return BookOpen;
        case 'video':
            return Video;
        case 'pasos':
            return ListChecks;
        default:
            return ImageIcon; // Icono por defecto si el tipo no coincide
    }
};

/**
 * Componente para mostrar una lista de guías relacionadas con un problema.
 * @param guias Array de objetos Guia a mostrar.
 */
export const ProblemGuides = ({ guias }: ProblemGuidesProps) => {
    if (!guias || guias.length === 0) {
        return null; // No renderizar nada si no hay guías
    }

    return (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Guías y Recursos Adicionales</h2>
            {guias.map((guia) => {
                const Icon = getGuideIcon(guia.tipo);
                return (
                    <Card key={guia.id} className="overflow-hidden">
                        {guia.imagen_url && (
                            <div className="h-48 w-full overflow-hidden">
                                <ImageWithFallback
                                    src={guia.imagen_url}
                                    alt={guia.titulo}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <CardTitle className="text-xl font-semibold text-gray-900">{guia.titulo}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{guia.contenido}</p>
                            {/* Aquí podrías añadir un botón para "Ver más" si el contenido es muy largo o un enlace a un recurso externo */}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};