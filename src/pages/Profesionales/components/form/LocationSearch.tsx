import { useRef } from 'react';
import {Autocomplete, useLoadScript} from '@react-google-maps/api';
import {Input} from "@/components/ui/input.tsx";

interface LocationSearchProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries: "places"[] = ["places"];

export const LocationSearch = ({onLocationSelect}: LocationSearchProps) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();

            if (lat !== undefined && lng !== undefined) {
                onLocationSelect({lat, lng});
            }
        }
    };

    if (loadError) return <p className="text-xs text-red-500">Error al cargar Google Maps.</p>;
    if (!isLoaded) return <p className="text-xs text-gray-500">Cargando buscador...</p>;

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{componentRestrictions: {country: 'pe'}}} // Opcional: Restringir a Perú
        >
            <Input type="text" placeholder="Escribe una calle, ciudad..." className="w-full"/>
        </Autocomplete>
    );
};