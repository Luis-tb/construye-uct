import { useState, useEffect } from 'react';

/**
 * Hook personalizado para monitorizar el estado de una media query de CSS.
 * Permite renderizar componentes de forma condicional según el tamaño de la pantalla.
 *
 * @param query - La media query string a evaluar (ej: '(max-width: 768px)').
 * @returns `true` si la media query coincide, de lo contrario `false`.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};