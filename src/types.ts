import type {FC} from 'react';

export interface Problema {
    id: number;
    categoria: string; // id de la categoría
    titulo: string;
    descripcion: string;
    solucion: string;
    costo: string;
    tiempo: string;
    dificultad: 'Baja' | 'Media' | 'Alta';
    prevencion: string;
}

export interface Categoria {
    id: string;
    nombre: string;
    icono: FC<{ className?: string; }>; // solo icono
    color: string;
    descripcion_breve?: string;
    problems?: number;
}

export interface MarkerData {
    id: string;
    lat: number;
    lng: number;
    label: string;
    specialty?: string;
    phone?: string;
}
