import {useEffect, useRef} from "react";
import type {LeafletMouseEvent, Map, Marker} from 'leaflet';
import {Card, CardContent} from "@/components/ui/card.tsx";
import {AlertTriangle, Loader2, MapPin} from "lucide-react";
import type {Professional} from "@/pages/Profesionales/professionals.data.ts";

interface ProfessionalsMapProps {
    mapId: string; // 👈 Prop para el ID único del mapa
    showMap: boolean;
    userLocation: { lat: number; lng: number } | null;
    locationStatus: 'idle' | 'loading' | 'success' | 'error';
    locationError: string | null;
    professionals: Professional[];
    selectedProfessional: Professional | null;
    onProfessionalSelect: (pro: Professional | null) => void;
    onMapClick: (location: { lat: number; lng: number }) => void; // 👈 La firma no cambia, solo la función que se le pasa
}

export const ProfessionalsMap = (props: ProfessionalsMapProps) => {
    const {
        mapId,
        showMap,
        userLocation,
        locationStatus,
        locationError,
        professionals,
        selectedProfessional,
        onProfessionalSelect,
        onMapClick
    } = props;
    const mapRef = useRef<Map | null>(null);
    const markersRef = useRef<Marker[]>([]);

    useEffect(() => {
        if (!showMap || !userLocation) return;

        import('leaflet').then((L) => {
            if (mapRef.current) {
                mapRef.current.remove();
            }

            const map = L.map(mapId).setView([userLocation.lat, userLocation.lng], 12);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(map);

            // 💡 MEJORA: Añadimos un listener para el clic en el mapa
            map.on('click', (e: LeafletMouseEvent) => {
                onMapClick(e.latlng);
            });

            // User Marker
            const userIcon = L.divIcon({
                className: 'custom-user-marker',
                html: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            });
            L.marker([userLocation.lat, userLocation.lng], {icon: userIcon}).addTo(map).bindPopup('<b>Tu ubicación</b>');

            // Clear previous markers
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            // Add new professional markers
            professionals.forEach((pro) => {
                const isSelected = pro.id === selectedProfessional?.id;
                const markerIcon = L.divIcon({
                    className: 'custom-pro-marker',
                    html: `
                        <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-300 ${
                        isSelected ? 'bg-blue-600 scale-125 z-10' : 'bg-green-500'
                    }">
                            <span class="text-white font-bold text-sm">${pro.rating.toFixed(1)}</span>
                        </div>
                    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                const marker = L.marker([pro.lat, pro.lng], {icon: markerIcon})
                    .addTo(map)
                    .bindPopup(`<b>${pro.name}</b><br>${pro.specialty}`)
                    .on('click', () => {
                        onProfessionalSelect(pro);
                        const element = document.getElementById(`professional-${pro.id}`);
                        element?.scrollIntoView({behavior: 'smooth', block: 'center'});
                    });
                markersRef.current.push(marker);
            });
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [showMap, userLocation, professionals, selectedProfessional, onProfessionalSelect, onMapClick, mapId]);

    // Center map on selected professional
    useEffect(() => {
        if (selectedProfessional && mapRef.current) {
            mapRef.current.setView([selectedProfessional.lat, selectedProfessional.lng], 15, {animate: true});
        }
    }, [selectedProfessional]);

    const MapState = () => {
        if (!showMap) {
            return (
                <div
                    className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-center p-8">
                        <div
                            className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-10 h-10 text-white"/>
                        </div>
                        <h3 className="mb-2 text-gray-900">Vista de mapa</h3>
                        <p className="text-gray-600 max-w-sm">Completa el formulario para ver profesionales cercanos en
                            el mapa interactivo</p>
                    </div>
                </div>
            );
        }

        if (locationStatus === 'loading') {
            return <div className="h-[70vh] flex flex-col items-center justify-center"><Loader2
                className="w-8 h-8 animate-spin text-blue-600 mb-4"/> <p>Obteniendo tu ubicación...</p></div>;
        }

        if (locationStatus === 'error') {
            return <div className="h-[70vh] flex flex-col items-center justify-center text-center p-4"><AlertTriangle
                className="w-8 h-8 text-red-500 mb-4"/> <p className="font-semibold text-red-600">Error de Ubicación</p>
                <p className="text-sm text-gray-600">{locationError}</p></div>;
        }

        return <div id={mapId} className="w-full h-full min-h-[70vh] bg-gray-200 rounded-lg z-0"></div>;
    };

    return (
        <Card className="h-full p-0">
            <CardContent className="p-0 h-full">
                <MapState/>
            </CardContent>
        </Card>
    );
};