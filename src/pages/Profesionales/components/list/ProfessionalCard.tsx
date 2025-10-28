import type {Professional} from "@/pages/Profesionales/professionals.data.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {cn} from "@/lib/utils.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Award, CheckCircle2, Mail, MapPin, MessageSquare, Phone, Star} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {createPath} from "@/config/routes.ts";

interface ProfessionalCardProps {
    professional: Professional;
    isSelected: boolean;
    onLocateClick: (pro: Professional) => void;
}

/**
 * @component ProfessionalCard
 * @description Muestra la tarjeta de un profesional con su información y acciones de contacto.
 * @param professional - El objeto del profesional a mostrar.
 * @param isSelected - Booleano que indica si la tarjeta está seleccionada.
 * @param onLocateClick - Callback que se ejecuta al hacer clic en la tarjeta para centrar el mapa.
 */
export const ProfessionalCard = ({professional, isSelected, onLocateClick}: ProfessionalCardProps) => {
    const navigate = useNavigate();

    /**
     * 💡 MEJORA: Función para limpiar y formatear el número de teléfono para los enlaces.
     * Elimina espacios y asume un código de país si no está presente.
     * @param phone - El número de teléfono.
     * @returns El número limpio para usar en `tel:` y `https://wa.me/`.
     */
    const getCleanPhoneNumber = (phone: string | undefined): string => {
        if (!phone) return "";
        let cleanPhone = phone.replace(/\s+/g, ''); // Elimina espacios
        if (cleanPhone.startsWith('+')) {
            cleanPhone = cleanPhone.substring(1); // Elimina el '+' inicial para wa.me
        }
        // Asumimos código de país de Perú (51) si no está presente
        if (!cleanPhone.startsWith('51')) {
            return `51${cleanPhone}`;
        }
        return cleanPhone;
    };

    const cleanPhone = getCleanPhoneNumber(professional.phone);

    return (
        <Card
            id={`professional-${professional.id}`}
            className={cn(
                "hover:shadow-lg transition-all cursor-pointer",
                isSelected && "ring-2 ring-blue-600 shadow-lg"
            )}
            onClick={() => navigate(createPath('PROFESSIONALS_PROFILE', {id: professional.id}))}
        >
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={professional.image} alt={professional.name} className="object-cover"/>
                        <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 truncate whitespace-normal line-clamp-2">{professional.name}</h4>
                            {professional.verified && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 rounded-full p-2">
                                    <CheckCircle2 className="w-3 h-3"/>
                                </Badge>
                            )}
                        </div>

                        <p className="text-gray-600 text-sm mb-2 truncate whitespace-normal line-clamp-2"
                           title={professional.specialty}>
                            {professional.specialty}
                        </p>

                        {/* 💡 MEJORA: Añadido flex-wrap para mejor adaptabilidad y se reincorpora la distancia. */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                                <span className="font-semibold text-gray-800">{professional.rating.toFixed(1)}</span>
                                <span className="text-gray-500">({professional.reviews} reseñas)</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                                <MapPin className="w-4 h-4"/>
                                <span>{professional.distance} km</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                                <Award className="w-4 h-4"/>
                                <span>{professional.completedJobs} trabajos</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {/* 💡 MEJORA: Botones de contacto funcionales */}
                            {cleanPhone && (
                                <>
                                    <Button asChild size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                                        <a href={`tel:+${cleanPhone}`}>
                                            <Phone className="w-4 h-4"/> Llamar
                                        </a>
                                    </Button>
                                    <Button asChild size="sm" variant="outline"
                                            className="bg-green-50 hover:bg-green-100 border-green-200 text-green-800"
                                            onClick={(e) => e.stopPropagation()}>
                                        <a href={`https://wa.me/${cleanPhone}`} target="_blank"
                                           rel="noopener noreferrer">
                                            <MessageSquare className="w-4 h-4"/> WhatsApp
                                        </a>
                                    </Button>
                                </>
                            )}
                            {professional.email && (
                                <Button asChild size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                                    <a href={`mailto:${professional.email}`}>
                                        <Mail className="w-4 h-4"/> Email
                                    </a>
                                </Button>
                            )}
                            <Button size="sm" variant="outline"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que el clic en el botón active la navegación de la tarjeta
                                        onLocateClick(professional);
                                    }}>
                                <MapPin className="w-4 h-4"/> Ubicar
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};