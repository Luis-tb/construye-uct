import type { FC } from "react";
import { Phone, User } from "lucide-react";
import type { MarkerData } from "@/types"; // Importar MarkerData desde types.ts

/**
 * Props para el componente MarkerInfoWindowContent.
 */
interface MarkerInfoWindowContentProps {
    marker: MarkerData;
}

/**
 * Componente para renderizar el contenido de la InfoWindow de un marcador.
 */
const MarkerInfoWindowContent: FC<MarkerInfoWindowContentProps> = ({ marker }) => {
    return (
        <div className="p-2 font-sans text-gray-800 max-w-xs">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <User size={18} /> {marker.label}
            </h3>
            {marker.specialty && (
                <p className="text-sm text-gray-600 mb-3">{marker.specialty}</p>
            )}
            {marker.phone && (
                <a href={`tel:${marker.phone}`}
                   className="inline-flex items-center gap-2 text-sm bg-green-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-green-600 transition-colors">
                    <Phone size={14} /> Llamar
                </a>
            )}
        </div>
    );
};

export default MarkerInfoWindowContent;