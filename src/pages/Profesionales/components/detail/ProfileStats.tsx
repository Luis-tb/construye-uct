import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Briefcase, Calendar, Star} from "lucide-react";
import type {ProfessionalProfile} from "@/pages/Profesionales/hooks/useProfessionalDetail.ts";

interface ProfileStatsProps {
    professional: ProfessionalProfile;
}

export const ProfileStats = ({professional}: ProfileStatsProps) => (
    <Card className="py-6">
        <CardHeader><CardTitle>Estadísticas</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500"/>Calificación</span>
                <span className="font-semibold">{professional.calificacion_promedio.toFixed(1)} ({professional.total_resenas} reseñas)</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-500"/>Trabajos Completados</span>
                <span className="font-semibold">{professional.total_trabajos}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2"><Calendar className="w-4 h-4 text-green-500"/>Años de Experiencia</span>
                <span className="font-semibold">{professional.experiencia_anios}</span></div>
        </CardContent>
    </Card>
);