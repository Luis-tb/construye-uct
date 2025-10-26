import type {FC} from "react";
import {useEffect, useMemo, useState} from "react";
import {GoogleMap, InfoWindow, Marker, useJsApiLoader} from '@react-google-maps/api';
import {Loader} from "lucide-react";
import type {MarkerData} from "@/types.ts"; // Importar MarkerData desde types.ts
import MarkerInfoWindowContent from "@/pages/Profesionales/components/map/MarkerInfoWindowContent.tsx"; // Nuevo componente para el contenido de InfoWindow

/**
 * Coordenadas por defecto para Trujillo, Perú.
 */
const DEFAULT_TRUJILLO_LOCATION = {
    lat: -8.11599,
    lng: -79.02998,
    label: "Plaza de Armas, Trujillo",
    id: 'default-location'
};

/**
 * Props para el componente MapComponent.
 */
interface MapComponentProps {
    markers?: MarkerData[];
    className?: string;
    zoom?: number;
}

/**
 * Componente reutilizable para mostrar un mapa de Google.
 * Pide la ubicación del usuario y la muestra con un marcador.
 * Es extensible para mostrar marcadores adicionales con perfiles.
 */
const MapComponent: FC<MapComponentProps> = ({
                                                 markers = [],
                                                 className = "h-96 w-full", // Altura por defecto
                                                 zoom = 15,
                                             }) => {

    const {isLoaded, loadError} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        // No es necesario especificar 'libraries' para los marcadores básicos.
    });

    /**
     * Memoiza el objeto de opciones para el componente GoogleMap.
     * Se define fuera del renderizado condicional para cumplir con las Reglas de los Hooks.
     */
    const mapOptions = useMemo(() => ({
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
    }), []);

    const [currentPosition, setCurrentPosition] = useState<MarkerData | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        label: "Tu ubicación actual",
                        id: 'current-user-location'
                    });
                },
                (error) => {
                    console.error("Error al obtener la geolocalización:", error);
                    // Ubicación por defecto en Trujillo, Perú si falla la geolocalización
                    setCurrentPosition(DEFAULT_TRUJILLO_LOCATION);
                }
            );
        }
    }, []);

    if (loadError) {
        return (
            <div className={`flex flex-col items-center justify-center bg-red-50 rounded-xl ${className}`}>
                <p className="font-semibold text-red-700">Error al cargar el mapa.</p>
            </div>
        );
    }

    if (!isLoaded || !currentPosition) {
        return (
            <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl ${className}`}>
                <Loader className="h-10 w-10 text-gray-500 animate-spin mb-4"/>
                <p className="font-semibold text-gray-700">Obteniendo ubicación...</p>
            </div>
        );
    }

    return (
        <div className={className} aria-label="Mapa de Google con ubicaciones">
            <GoogleMap
                mapContainerClassName="w-full h-full rounded-2xl"
                center={currentPosition}
                zoom={zoom}
                options={mapOptions}
            >
                {/* Marcador para la ubicación actual del usuario (azul) */}
                <Marker
                    position={currentPosition}
                    title={currentPosition.label}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }}
                />

                {/* Renderizar marcadores adicionales (para profesionales, etc.) */}
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker}
                        title={marker.label}
                        onClick={() => setSelectedMarker(marker)}
                    />
                ))}

                {/* Ventana de información para el marcador seleccionado */}
                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker}
                        onCloseClick={() => setSelectedMarker(null)}
                        // Creamos el objeto de opciones aquí, donde 'window.google' ya está garantizado que existe
                        // porque este bloque solo se renderiza cuando isLoaded es true.
                        options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
                    >
                        {/* Contenido de la InfoWindow extraído a un componente separado */}
                        <MarkerInfoWindowContent marker={selectedMarker}/>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};

export default MapComponent;