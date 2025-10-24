import type { FC } from 'react';

/**
 * Representa un problema común de construcción con su solución detallada.
 */
export interface Problema {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  solucion: string;
  costo: string;
  tiempo: string;
  dificultad: 'Baja' | 'Media' | 'Alta';
  prevencion: string;
}

/**
 * Representa una categoría de problema, incluyendo un icono para la UI.
 */
export interface Categoria {
  id: string;
  nombre: string;
  icono: FC<{ className?: string }>;
}

/**
 * Representa un enlace a una guía de construcción principal.
 */
export interface GuiaPrincipal {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  icono: FC<{ className?: string }>;
}

/**
 * Define la estructura de un marcador para el mapa.
 */
export interface MarkerData {
    id: string;
    lat: number;
    lng: number;
    label: string; // Nombre del profesional o lugar
    specialty?: string; // Especialidad del profesional
    phone?: string; // Teléfono de contacto
}
