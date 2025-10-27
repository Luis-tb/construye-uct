export interface Professional {
    id: string; // 💡 CAMBIO: El ID de Supabase es un UUID (string)
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    distance: number; // Será calculado dinámicamente
    location: string;
    lat: number; // 💡 AÑADIDO: Coordenada de latitud
    lng: number; // 💡 AÑADIDO: Coordenada de longitud
    image: string;
    verified: boolean;
    responseTime: string;
    completedJobs: number;
    priceRange: string;
    availability: string;
    phone: string;
    email: string;
}