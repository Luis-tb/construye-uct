import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient.ts";
import type {Categoria} from "@/types.ts";
import * as LucideIcons from 'lucide-react';
import {BookOpen, Home as HomeIcon} from 'lucide-react';

/**
 * Opciones para configurar el comportamiento del hook `useCategorias`.
 */
interface UseCategoriasOptions {
    /**
     * Si es `true`, cada categoría incluirá una propiedad `problems` con el conteo
     * de los problemas asociados. Esto realiza una consulta más compleja.
     * @default false
     */
    withProblemCount?: boolean;
    /**
     * Si es `true`, se añadirá una categoría "Todos" al principio de la lista.
     * @default false
     */
    includeAll?: boolean;
}

/**
 * Función asíncrona para obtener y procesar las categorías desde Supabase.
 * Esta función se puede reutilizar y probar de forma aislada.
 * @param {boolean} withProblemCount - Si se debe incluir el conteo de problemas.
 */
const fetchCategorias = async (withProblemCount: boolean): Promise<Categoria[]> => {
    // Construimos la consulta dinámicamente.
    // Si withProblemCount es true, le pedimos a Supabase que cuente los elementos en la tabla relacionada 'problemas'.
    const query = withProblemCount
        ? supabase.from("categorias").select('*, problems:problemas(count)')
        : supabase.from("categorias").select('*');

    const {data: categoriasData, error: catError} = await query;

    if (catError) {
        throw new Error(catError.message);
    }

    return (categoriasData || []).map((cat) => {
        const IconComponent = LucideIcons[cat.icono as keyof typeof LucideIcons] || HomeIcon;

        // Si pedimos el conteo, el resultado viene en un array. Lo extraemos.
        const problemCount = withProblemCount ? (cat.problems[0]?.count ?? 0) : 0;

        return {
            ...cat,
            icono: IconComponent,
            problems: problemCount
        };
    });
};

/**
 * Hook personalizado que utiliza TanStack Query para obtener, cachear y gestionar
 * el estado de las categorías.
 *
 * @param {UseCategoriasOptions} options - Opciones para configurar el hook.
 * @returns Un objeto con:
 *  - `data` (renombrado a `categorias`): El array de categorías.
 *  - `isLoading`: Booleano que indica el estado de carga.
 *  - `error`: Objeto de error si la petición falla.
 */
export const useCategorias = (options: UseCategoriasOptions = {}) => {
    const {withProblemCount = false, includeAll = false} = options;

    const {data: categorias, isLoading, error} = useQuery({
        // 💡 MEJORA: La queryKey ahora es dinámica.
        // Esto asegura que TanStack Query cachee los resultados por separado
        // para cada combinación de opciones.
        queryKey: ['categorias', {withProblemCount, includeAll}],
        queryFn: async () => {
            const fetchedCategorias = await fetchCategorias(withProblemCount);

            if (includeAll) {
                const allCategory: Categoria = {
                    id: 'all',
                    nombre: 'Todos',
                    icono: BookOpen,
                    descripcion_breve: '',
                    color: '',
                    problems: withProblemCount ? fetchedCategorias.reduce((sum, cat) => sum + (cat.problems || 0), 0) : 0,
                };
                return [allCategory, ...fetchedCategorias];
            }

            return fetchedCategorias;
        },
    });

    // Devolvemos los datos con nombres más semánticos para el componente que lo consume.
    return {categorias: categorias ?? [], loading: isLoading, error: error?.message ?? null};
};