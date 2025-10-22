import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Combina múltiples clases de Tailwind CSS de forma segura, resolviendo conflictos.
 * @param inputs - Una lista de clases de CSS.
 * @returns Una cadena de clases de CSS optimizada.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Devuelve las clases de CSS para el badge de dificultad basado en el nivel.
 * @param dificultad - El nivel de dificultad ('Baja', 'Media', 'Alta').
 * @returns Una cadena de clases de Tailwind CSS.
 */
export const getDifficultyBadgeClasses = (dificultad: 'Baja' | 'Media' | 'Alta'): string => {
  const baseClasses = "text-xs font-semibold px-2.5 py-1 rounded-full";
  switch (dificultad) {
    case "Baja":
      return `bg-green-100 text-green-800 ${baseClasses}`;
    case "Media":
      return `bg-yellow-100 text-yellow-800 ${baseClasses}`;
    case "Alta":
      return `bg-red-100 text-red-800 ${baseClasses}`;
    default:
      return `bg-gray-100 text-gray-800 ${baseClasses}`;
  }
};
