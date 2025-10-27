import {useCallback, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {allProfessionals as professionalsData} from "@/pages/Profesionales/professionals.data.ts";
import type {Professional} from "@/pages/Profesionales/professionals.data.ts";

type GeolocationStatus = 'idle' | 'loading' | 'success' | 'error';
/**
 * Define los posibles criterios de ordenamiento para la lista de profesionales.
 */
export type SortOption = 'distance' | 'rating' | 'jobs';

/**
 * Calcula la distancia en kilómetros entre dos puntos geográficos.
 * @param lat1 - Latitud del punto 1.
 * @param lon1 - Longitud del punto 1.
 * @param lat2 - Latitud del punto 2.
 * @param lon2 - Longitud del punto 2.
 * @returns La distancia en kilómetros.
 */
const getDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * @module useProfessionals
 * @description Hook para gestionar la lógica de la página de búsqueda de profesionales.
 * Incluye geolocalización, cálculo de distancias y filtrado.
 */
export const useProfessionals = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // --- State Management ---
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationStatus, setLocationStatus] = useState<GeolocationStatus>('idle');
    const [locationError, setLocationError] = useState<string | null>(null);

    // --- State from URL ---
    const showProfessionals = useMemo(() => searchParams.get('search') === 'true', [searchParams]);
    const maxDistance = useMemo(() => parseFloat(searchParams.get('dist') || '5'), [searchParams]);
    const minRating = useMemo(() => parseFloat(searchParams.get('rating') || '0'), [searchParams]);
    const selectedSpecialty = useMemo(() => searchParams.get('spec') || 'all', [searchParams]);
    const sortBy = useMemo(() => (searchParams.get('sort') as SortOption) || 'distance', [searchParams]);

    // --- State Updaters ---
    const updateQueryParam = useCallback((key: string, value: string | number) => {
        setSearchParams(prev => {
            prev.set(key, String(value));
            return prev;
        }, {replace: true});
    }, [setSearchParams]);

    const setSelectedSpecialty = (value: string) => updateQueryParam('spec', value);
    const setSortBy = (value: SortOption) => updateQueryParam('sort', value);

    const applyFilters = useCallback(({distance, rating}: { distance: number, rating: number }) => {
        setSearchParams(prev => {
            prev.set('dist', String(distance));
            prev.set('rating', String(rating));
            return prev;
        }, {replace: true});
    }, [setSearchParams]);
    /**
     * Callback para actualizar manualmente la ubicación del usuario.
     * @param location - Objeto con latitud y longitud.
     */
    const setUserLocationManually = useCallback((location: { lat: number; lng: number }) => {
        setUserLocation(location);
        setLocationStatus('success'); // Marcamos como exitoso ya que fue una acción del usuario.
        // Actualiza la URL para reflejar la nueva ubicación de búsqueda
        setSearchParams(prev => {
            prev.set('lat', String(location.lat));
            prev.set('lng', String(location.lng));
            // Al cambiar la ubicación manualmente, no iniciamos una nueva búsqueda automáticamente.
            prev.delete('search');
            return prev;
        }, {replace: true});
    }, [setSearchParams]);

    // --- Effects ---

    /**
     * Efecto para obtener la geolocalización del usuario al montar el componente.
     */
    useEffect(() => {
        // Si ya hay una ubicación en la URL, la usamos.
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        if (lat && lng) {
            setUserLocation({lat: parseFloat(lat), lng: parseFloat(lng)});
            setLocationStatus('success');
        } else {
            // Si no, intentamos obtenerla del navegador.
            setLocationStatus('loading');
            if (!navigator.geolocation) {
                setLocationStatus('error');
                setLocationError("La geolocalización no es soportada por tu navegador.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
                    setUserLocation(newLocation);
                    setLocationStatus('success');
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error);
                    setLocationStatus('error');
                    setLocationError("No se pudo obtener la ubicación. Por favor, activa los permisos.");
                    setUserLocation({lat: -8.1116, lng: -79.0288}); // Fallback a Trujillo
                }
            );
        }
    }, [searchParams]);

    /**
     * Profesionales con la distancia calculada desde la ubicación del usuario.
     */
    const professionalsWithDistance = useMemo(() => {
        if (!userLocation) return [];
        return professionalsData.map(pro => ({
            ...pro,
            distance: parseFloat(getDistanceInKm(userLocation.lat, userLocation.lng, pro.lat, pro.lng).toFixed(1)),
        })).sort((a, b) => a.distance - b.distance);
    }, [userLocation]);

    /**
     * Profesionales filtrados según los criterios seleccionados.
     */
    const filteredAndSortedProfessionals = useMemo(() => {
        const filtered = professionalsWithDistance.filter(pro => {
            const matchesDistance = pro.distance <= maxDistance;
            const matchesRating = pro.rating >= minRating;
            const matchesSpecialty = selectedSpecialty === "all" ||
                pro.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
            return matchesDistance && matchesRating && matchesSpecialty;
        });

        // 💡 MEJORA: Aplicamos el ordenamiento después del filtrado.
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating; // Descendente (mejor a peor)
                case 'jobs':
                    return b.completedJobs - a.completedJobs; // Descendente (más a menos)
                case 'distance':
                default:
                    return a.distance - b.distance; // Ascendente (más cercano a más lejano)
            }
        });
    }, [professionalsWithDistance, maxDistance, minRating, selectedSpecialty, sortBy]);

    // --- Callbacks ---

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (userLocation) {
            // La búsqueda ahora consiste en poner la ubicación del usuario en la URL
            setSearchParams(prev => {
                // Conservamos los filtros existentes si los hay
                prev.set('lat', String(userLocation.lat));
                prev.set('lng', String(userLocation.lng));
                prev.set('search', 'true'); // 💡 La clave: activamos la búsqueda explícitamente
                return prev;
            }, {replace: true});
        }
    }, [userLocation, setSearchParams]);

    const resetFilters = useCallback(() => {
        setSearchParams(prev =>
            // Mantenemos la ubicación y el estado de búsqueda, pero limpiamos los filtros.
            new URLSearchParams({
                lat: prev.get('lat') || '',
                lng: prev.get('lng') || '',
                search: prev.get('search') || ''
            }), {replace: true});
    }, [setSearchParams]);

    return {
        // State
        showProfessionals,
        selectedProfessional, setSelectedProfessional,
        userLocation, locationStatus, locationError,
        filteredProfessionals: filteredAndSortedProfessionals,
        setUserLocationManually,
        // Filters
        maxDistance, minRating,
        selectedSpecialty, setSelectedSpecialty,
        // Sorting
        sortBy, setSortBy,
        // Actions
        handleSearch,
        resetFilters,
        applyFilters,
    };
};