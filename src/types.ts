import type {FC} from 'react';

export interface Problem {
    id: string;
    title: string;
    cause: string;
    image: string;
    // icon: React.ElementType; // Se elimina, ahora se obtiene de la categoría
    category: string;
    severity: "low" | "medium" | "high";
}

export interface Categoria {
    id: string;
    nombre: string;
    icono: FC<{ className?: string; }>; // solo icono
    color: string;
    descripcion_breve?: string;
    problems?: number;
}
export interface ProblemDetailData {
    commonCause: string;
    whyItHappens: string;
    solutions: string[];
}

export interface Guia { // Aseguramos que 'Guia' esté explícitamente exportada
    id: string;
    titulo: string;
    contenido: string;
    tipo: string; // e.g., 'articulo', 'video', 'pasos'
    imagen_url?: string;
}


export interface MarkerData {
    id: string;
    lat: number;
    lng: number;
    label: string;
    specialty?: string;
    phone?: string;
}
