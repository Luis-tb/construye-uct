export interface Professional {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    distance: number; // Será calculado dinámicamente
    location: string;
    lat: number;
    lng: number;
    image: string;
    verified: boolean;
    responseTime: string;
    completedJobs: number;
    priceRange: string;
    availability: string;
    phone: string;
    email: string;
}

/**
 * Lista centralizada de especialidades de los profesionales.
 * Usada para poblar los filtros y para la data de ejemplo.
 */
export const professionalSpecialties = {
    "Estructuras": "Estructuras y Cimientos",
    "Eléctricas": "Instalaciones Eléctricas",
    "Plomería": "Plomería y Filtraciones",
    "Techos": "Techos e Impermeabilización",
    "Pintura": "Pintura y Acabados",
    "Remodelaciones": "Remodelaciones y Diseño",
};

// Simulated professionals data with real coordinates around Trujillo, Perú
export const allProfessionals: Omit<Professional, 'distance'>[] = [
    {
        id: 1,
        name: "Ing. Carlos Méndez",
        specialty: professionalSpecialties.Estructuras,
        rating: 4.9,
        reviews: 127,
        location: "Centro Histórico de Trujillo",
        lat: -8.1116,
        lng: -79.0288,
        image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop",
        verified: true,
        responseTime: "~15 min",
        completedJobs: 245,
        priceRange: "$$$",
        availability: "Disponible hoy",
        phone: "+51 944 123 456",
        email: "carlos.mendez@email.com"
    },
    {
        id: 2,
        name: "Arq. María González",
        specialty: professionalSpecialties.Remodelaciones,
        rating: 4.8,
        reviews: 98,
        location: "Víctor Larco Herrera",
        lat: -8.1350,
        lng: -79.0350,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        verified: true,
        responseTime: "~20 min",
        completedJobs: 178,
        priceRange: "$$$$",
        availability: "Disponible mañana",
        phone: "+51 944 234 567",
        email: "maria.gonzalez@email.com"
    },
    {
        id: 3,
        name: "Ing. Roberto Silva",
        specialty: professionalSpecialties.Eléctricas,
        rating: 5.0,
        reviews: 156,
        location: "La Merced",
        lat: -8.1050,
        lng: -79.0250,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        responseTime: "~10 min",
        completedJobs: 312,
        priceRange: "$$$",
        availability: "Disponible ahora",
        phone: "+51 944 345 678",
        email: "roberto.silva@email.com"
    },
    {
        id: 4,
        name: "Téc. Ana Ramírez",
        specialty: professionalSpecialties.Plomería,
        rating: 4.7,
        reviews: 83,
        location: "El Porvenir",
        lat: -8.0850,
        lng: -79.0150,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        verified: true,
        responseTime: "~25 min",
        completedJobs: 156,
        priceRange: "$$",
        availability: "Disponible hoy",
        phone: "+51 944 456 789",
        email: "ana.ramirez@email.com"
    },
    {
        id: 5,
        name: "Mtro. Luis Hernández",
        specialty: professionalSpecialties.Techos,
        rating: 4.9,
        reviews: 142,
        location: "La Esperanza",
        lat: -8.0650,
        lng: -79.0450,
        image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1974&auto=format&fit=crop",
        verified: true,
        responseTime: "~30 min",
        completedJobs: 201,
        priceRange: "$$$",
        availability: "Disponible mañana",
        phone: "+51 944 567 890",
        email: "luis.hernandez@email.com"
    },
    {
        id: 6,
        name: "Ing. Patricia Morales",
        specialty: professionalSpecialties.Pintura,
        rating: 4.8,
        reviews: 91,
        location: "Primavera",
        lat: -8.1200,
        lng: -79.0100,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        verified: true,
        responseTime: "~18 min",
        completedJobs: 167,
        priceRange: "$$",
        availability: "Disponible ahora",
        phone: "+51 944 678 901",
        email: "patricia.morales@email.com"
    },
    {
        id: 7,
        name: "Ing. Jorge Castro",
        specialty: professionalSpecialties.Estructuras,
        rating: 4.6,
        reviews: 74,
        location: "Moche",
        lat: -8.1700,
        lng: -79.0100,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        verified: false,
        responseTime: "~40 min",
        completedJobs: 89,
        priceRange: "$$",
        availability: "Disponible en 2 días",
        phone: "+51 944 789 012",
        email: "jorge.castro@email.com"
    },
    {
        id: 8,
        name: "Téc. Sandra López",
        specialty: professionalSpecialties.Eléctricas,
        rating: 4.9,
        reviews: 118,
        location: "Huanchaco",
        lat: -8.0800,
        lng: -79.1200,
        image: "https://images.unsplash.com/photo-1619940180344-6b2a0f5a3934?q=80&w=1887&auto=format&fit=crop",
        verified: true,
        responseTime: "~12 min",
        completedJobs: 234,
        priceRange: "$$$",
        availability: "Disponible ahora",
        phone: "+51 944 890 123",
        email: "sandra.lopez@email.com"
    },
    {
        id: 9,
        name: "Ing. Fernando Vega",
        specialty: professionalSpecialties.Plomería,
        rating: 4.7,
        reviews: 102,
        location: "Florencia de Mora",
        lat: -8.0950,
        lng: -79.0050,
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop",
        verified: true,
        responseTime: "~22 min",
        completedJobs: 189,
        priceRange: "$$",
        availability: "Disponible hoy",
        phone: "+51 945 123 456",
        email: "fernando.vega@email.com"
    },
    {
        id: 10,
        name: "Arq. Claudia Ruiz",
        specialty: professionalSpecialties.Remodelaciones,
        rating: 5.0,
        reviews: 134,
        location: "Urb. San Andrés",
        lat: -8.1080,
        lng: -79.0350,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop",
        verified: true,
        responseTime: "~8 min",
        completedJobs: 267,
        priceRange: "$$$$",
        availability: "Disponible ahora",
        phone: "+51 945 234 567",
        email: "claudia.ruiz@email.com"
    },
    {
        id: 11,
        name: "Mtro. Diego Paredes",
        specialty: professionalSpecialties.Techos,
        rating: 4.8,
        reviews: 96,
        location: "Laredo",
        lat: -8.0850,
        lng: -78.9600,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        verified: true,
        responseTime: "~35 min",
        completedJobs: 143,
        priceRange: "$$$",
        availability: "Disponible mañana",
        phone: "+51 945 345 678",
        email: "diego.paredes@email.com"
    },
    {
        id: 12,
        name: "Téc. Gabriela Torres",
        specialty: professionalSpecialties.Pintura,
        rating: 4.6,
        reviews: 78,
        location: "Buenos Aires",
        lat: -8.1250,
        lng: -79.0200,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
        verified: true,
        responseTime: "~16 min",
        completedJobs: 124,
        priceRange: "$$",
        availability: "Disponible ahora",
        phone: "+51 945 456 789",
        email: "gabriela.torres@email.com"
    },
];