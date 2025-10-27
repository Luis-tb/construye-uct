import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {allProfessionals} from "@/pages/Profesionales/professionals.data.ts";
import type {Professional} from "@/pages/Profesionales/professionals.data.ts";
import {Loader} from "lucide-react";

/**
 * Página de detalle para un profesional específico.
 * Muestra información ampliada, portafolio, reseñas, etc.
 */
export default function ProfessionalDetail() {
    const {id} = useParams<{ id: string }>();
    const [professional, setProfessional] = useState<Professional | undefined>(undefined);

    useEffect(() => {
        // En una aplicación real, aquí harías una llamada a la API:
        // const data = await fetchProfessionalById(id);
        // Por ahora, lo buscamos en los datos estáticos.
        const found = allProfessionals.find(p => p.id === Number(id)) as Professional | undefined;
        setProfessional(found);
    }, [id]);

    if (!professional) {
        return <div className="flex justify-center items-center h-96"><Loader className="animate-spin"/></div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">{professional.name}</h1>
            <p className="text-xl text-gray-600">{professional.specialty}</p>
            {/* Aquí iría el resto de la información detallada del profesional */}
        </div>
    );
}