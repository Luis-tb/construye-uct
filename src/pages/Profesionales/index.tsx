import type {MarkerData} from "@/types.ts";
import MapComponent from "@/pages/Profesionales/components/map/MapComponent.tsx";
import {Users} from "lucide-react";

// Datos de ejemplo para profesionales cercanos.
// En una aplicación real, estos datos vendrían de una API.
// Coordenadas en Trujillo, Perú.
const profesionalesCercanos: MarkerData[] = [
    {id: "prof-1", lat: -8.1093, lng: -79.0225, label: "Juan Pérez", specialty: "Albañilería y Acabados", phone: "987654321"},
    {id: "prof-2", lat: -8.1138, lng: -79.0355, label: "María García", specialty: "Instalaciones Eléctricas", phone: "987123456"},
    {id: "prof-3", lat: -8.1201, lng: -79.0289, label: "Carlos Ruiz", specialty: "Gasfitería y Sanitarios", phone: "999888777"},
];

/**
 * Página para mostrar profesionales en un mapa.
 * Utiliza el componente reutilizable MapComponent.
 */
export default function Index() {
    return (
        <div className="bg-gray-50 py-16 md:py-20">
            <main className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-4">
                        <Users className="h-10 w-10"/>
                        Encuentra Profesionales
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Visualiza en el mapa a los expertos en construcción más cercanos a tu ubicación.
                    </p>
                </div>

                {/* console.log("Profesionales está renderizando MapComponent") */}
                <MapComponent markers={profesionalesCercanos} className="h-[600px] w-full"/>
            </main>
        </div>
    );
}