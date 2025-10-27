import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {BadgeCheck, Mail, MapPin, Phone} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import type {ProfessionalProfile} from "@/pages/Profesionales/hooks/useProfessionalDetail.ts";

interface ProfileHeaderProps {
    professional: ProfessionalProfile;
}

export const ProfileHeader = ({professional}: ProfileHeaderProps) => {
    const fullName = `${professional.nombres} ${professional.apellidos}`;

    return (
        <Card className="overflow-hidden text-center shadow-lg">
            <CardContent className="p-6">
                <img
                    src={professional.foto_perfil_url}
                    alt={fullName}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover"
                />
                <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
                {professional.verificado && (
                    <Badge className="mt-2 bg-blue-100 text-blue-700">
                        <BadgeCheck className="w-4 h-4 mr-1.5"/>
                        Profesional Verificado
                    </Badge>
                )}
                <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4"/> {professional.direccion_referencial}
                </p>
                <div className="mt-6 flex flex-col space-y-3">
                    <Button size="lg" asChild><a href={`tel:${professional.telefono}`}><Phone
                        className="w-4 h-4 mr-2"/> Llamar ahora</a></Button>
                    <Button size="lg" variant="outline" asChild><a href={`mailto:${professional.email}`}><Mail
                        className="w-4 h-4 mr-2"/> Enviar Mensaje</a></Button>
                </div>
            </CardContent>
        </Card>
    );
};