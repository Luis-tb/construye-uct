import {useParams} from "react-router-dom";
import {
    Award,
    ChevronRight,
    Loader2,
} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {useProfessionalDetail} from "@/pages/Profesionales/hooks/useProfessionalDetail.ts";
import {ProfileHeader} from "@/pages/Profesionales/components/detail/ProfileHeader.tsx";
import {ProfileStats} from "@/pages/Profesionales/components/detail/ProfileStats.tsx";
import {ProfileSection} from "@/pages/Profesionales/components/detail/ProfileSection.tsx";
import {ReviewCard} from "@/pages/Profesionales/components/detail/ReviewCard.tsx";

/**
 * Página de detalle para un profesional específico.
 * Muestra información ampliada, portafolio, reseñas, etc.
 */
export default function ProfessionalDetail() {
    const {id} = useParams<{ id: string }>();
    // 💡 MEJORA: Toda la lógica de fetching está ahora en el hook.
    const {professional, isLoading, error} = useProfessionalDetail(id);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2
            className="animate-spin w-12 h-12 text-blue-600"/></div>;
    }

    if (error || !professional) {
        return <div className="text-center py-20 text-red-600">Error al cargar el perfil del profesional. Por favor,
            intenta de nuevo.</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Columna Izquierda: Perfil y Acciones */}
                    <div className="lg:col-span-1 space-y-6">
                        <ProfileHeader professional={professional}/>
                        <ProfileStats professional={professional}/>
                    </div>

                    {/* Columna Derecha: Detalles, Certificaciones y Reseñas */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Especialidades (solo si existen) */}
                        {professional.especialidades && professional.especialidades.length > 0 && (
                            <ProfileSection title="Especialidades">
                                <div className="flex flex-wrap gap-2">
                                    {professional.especialidades.map(spec => (
                                        <Badge key={spec.especialidades.id} variant="secondary"
                                               className="text-base py-1 px-3">{spec.especialidades.nombre}</Badge>
                                    ))}
                                </div>
                            </ProfileSection>
                        )}

                        {/* Certificaciones */}
                        {professional.certificaciones.length > 0 && (
                            <ProfileSection title="Certificaciones y Credenciales">
                                <ul className="space-y-4">
                                    {professional.certificaciones.map(cert => (
                                        <li key={cert.id}
                                            className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                                            <div className="bg-blue-100 p-3 rounded-full"><Award
                                                className="w-6 h-6 text-blue-600"/></div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{cert.nombre_estandar}</p>
                                                <p className="text-sm text-gray-500">Emitido
                                                    por: {cert.entidad_emisora}</p>
                                            </div>
                                            {cert.url_credencial && (
                                                <a href={cert.url_credencial} target="_blank" rel="noopener noreferrer"
                                                   className="ml-auto">
                                                    <ChevronRight className="w-5 h-5 text-gray-400 hover:text-blue-600"/>
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </ProfileSection>
                        )}

                        {/* Reseñas */}
                        <ProfileSection title={`Reseñas de Clientes (${professional.total_resenas})`}>
                            <div className="space-y-6">
                                {professional.resenas.length > 0
                                    ? professional.resenas.map(review => <ReviewCard key={review.id} review={review}/>)
                                    : <p className="text-center text-gray-500 py-8">Este profesional aún no tiene
                                        reseñas.</p>
                                }
                            </div>
                        </ProfileSection>
                    </div>
                </div>
            </div>
        </div>
    );
}