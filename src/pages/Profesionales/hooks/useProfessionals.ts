import {useCallback, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import type {Professional} from "@/pages/Profesionales/professionals.data.ts";
import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient.ts";

type GeolocationStatus = 'idle' | 'loading' | 'success' | 'error';
/**
 * Define los posibles criterios de ordenamiento para la lista de profesionales.
 */
export type SortOption = 'distance' | 'rating' | 'jobs';

/**
 * 💡 MEJORA: Define el tipo de dato que retorna la RPC de Supabase.
 * Esto nos permite tipar correctamente la respuesta y evitar 'any'.
 */
type ProfessionalFromRPC = Omit<Professional, 'distance'> & { distance: number };

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
    const maxDistance = useMemo(() => parseFloat(searchParams.get('dist') || '10'), [searchParams]);
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
    const [locationInputMode, setLocationInputMode] = useState<'gps' | 'search'>('search');

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
        // 💡 MEJORA: Al hacer clic en el mapa, ahora se mantiene o se inicia la búsqueda.
        setSearchParams(prev => {
            prev.set('lat', String(location.lat));
            prev.set('lng', String(location.lng));
            // Si ya estábamos en modo búsqueda, lo mantenemos. Si no, lo activamos.
            prev.set('search', 'true');
            return prev;
        }, {replace: true});
    }, [setSearchParams]);

    /**
     * 💡 MEJORA: Callback específico para cuando se hace clic en el mapa.
     * Actualiza la ubicación y cambia el modo del input a 'search'.
     */
    const handleMapClick = useCallback((location: { lat: number; lng: number }) => {
        setUserLocationManually(location);
        // Cambia el modo del input a 'search' para dar feedback visual al usuario.
        setLocationInputMode('search');
    }, [setUserLocationManually]);

    /**
     * 💡 MEJORA: Centralizamos la lógica que inicia la búsqueda.
     * Esta función actualiza la URL con la ubicación actual y el flag 'search=true'.
     */
    const startSearch = useCallback(() => {
        if (userLocation) {
            setSearchParams(prev => {
                prev.set('lat', String(userLocation.lat));
                prev.set('lng', String(userLocation.lng));
                prev.set('search', 'true');
                return prev;
            }, {replace: true});
        }
    }, [userLocation, setSearchParams]);

    /**
     * Callback para obtener la geolocalización del usuario cuando la solicita.
     */
    const requestUserLocation = useCallback(() => {
        // 💡 MEJORA: Siempre intenta obtener la ubicación fresca del navegador, ignorando la URL.
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
                // 💡 MEJORA: Inicia la búsqueda automáticamente después de obtener la ubicación.
                startSearch();
            },
            (error) => {
                console.error("Error obteniendo la ubicación:", error);
                setLocationStatus('error');
                setLocationError("No se pudo obtener la ubicación. Por favor, activa los permisos.");
                // Considera un fallback si es necesario, o simplemente muestra el error.
                // setUserLocation({lat: -8.1116, lng: -79.0288}); // Fallback a Trujillo
            }
        );
    }, [startSearch]);

    // --- Effects ---
    // Carga la ubicación desde la URL al montar el componente, si existe.
    useEffect(() => {
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        if (lat && lng && !userLocation) {
            setUserLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
            setLocationStatus('success');
        }
    }, [searchParams, userLocation]);

    // --- Data Fetching con React Query ---
    const {
        data: professionalsFromDB = [],
        isLoading: isLoadingProfessionals
    }: UseQueryResult<Professional[], Error> = useQuery({
        // 💡 La queryKey es dinámica. Si cambia alguno de estos valores, se hará un nuevo fetch.
        queryKey: ['professionals', userLocation, maxDistance],
        queryFn: async () => {
            if (!userLocation) return [];
            // Llamamos a la función RPC de Supabase que creamos.
            const {data, error} = await supabase.rpc('nearby_professionals', {
                lat_in: userLocation.lat,
                lng_in: userLocation.lng,
                radius_km_in: maxDistance, // Usamos maxDistance para pre-filtrar en la DB.
            });
            if (error) {
                console.error("Error fetching professionals:", error);
                throw new Error(error.message);
            }

            // Aseguramos que la distancia tenga un solo decimal.
            // 💡 CORRECCIÓN: Tipamos 'p' con el tipo que definimos para la data de la RPC.
            return (data || []).map((p: ProfessionalFromRPC) => ({
                ...p,
                distance: parseFloat(p.distance.toFixed(1))
            }));
        },
        // Solo ejecutar la query si tenemos una ubicación de usuario y se ha iniciado la búsqueda.
        enabled: !!userLocation && showProfessionals,
    });

    /**
     * Profesionales filtrados según los criterios seleccionados.
     */
    const filteredAndSortedProfessionals = useMemo(() => {
        // El filtro de distancia ya se hizo en la DB, ahora filtramos por rating y especialidad en el cliente.
        const filtered = professionalsFromDB.filter(pro => {
            const matchesRating = pro.rating >= minRating;
            // 💡 CORRECCIÓN: Un profesional puede tener varias especialidades en un string ("Plomería, Electricidad").
            // Usamos `includes` para verificar si la especialidad seleccionada está dentro de ese string.
            const matchesSpecialty = selectedSpecialty === "all" || (pro.specialty && pro.specialty.includes(selectedSpecialty));
            return matchesRating && matchesSpecialty;
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
    }, [professionalsFromDB, minRating, selectedSpecialty, sortBy]);

    // --- Callbacks ---

    /**
     * Maneja el evento de envío del formulario de búsqueda.
     */
    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        startSearch();
    }, [startSearch]);

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
        filteredProfessionals: showProfessionals ? filteredAndSortedProfessionals : [],
        // 💡 MEJORA: Exponemos el estado de carga para que los componentes puedan usarlo.
        isLoading: isLoadingProfessionals || locationStatus === 'loading',
        isLoadingLocation: locationStatus === 'loading',
        locationInputMode, setLocationInputMode,
        handleMapClick,
        setUserLocationManually,
        // Filters
        maxDistance, minRating,
        selectedSpecialty, setSelectedSpecialty,
        // Sorting
        sortBy, setSortBy,
        // Actions
        handleSearch,
        requestUserLocation, // Esta función ahora también inicia la búsqueda
        resetFilters,
        applyFilters,
    };
};