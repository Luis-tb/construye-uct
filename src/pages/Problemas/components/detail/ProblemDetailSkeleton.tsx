import { Skeleton } from "@/components/ui/skeleton.tsx";

/**
 * Componente de esqueleto de carga para la página de detalle de un problema.
 * Muestra una estructura visual similar al contenido final mientras se cargan los datos.
 */
export const ProblemDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* Botón de volver */}
                <Skeleton className="h-8 w-48 mb-6" />

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <Skeleton className="h-96 rounded-lg mb-8" />

                    {/* Contenido */}
                    <div className="space-y-6">
                        <Skeleton className="h-24 w-full rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                    </div>

                    {/* CTA Profesional */}
                    <Skeleton className="h-40 w-full rounded-lg mt-8" />
                </div>
            </div>
        </div>
    );
};