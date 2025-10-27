import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient.ts";
import type { Categoria } from "@/types.ts";
import * as LucideIcons from "lucide-react";
import { BookOpen, Home as HomeIcon } from "lucide-react";
import type { FC } from "react";


/**
 * Estructura de la categoría como la devuelve Supabase.
 */
interface SupabaseCategoriaRaw {
    id: string;
    nombre: string;
    icono: string;
    color: string;
    descripcion_breve?: string;
    problems?: { count: number }[] | number;
}

/**
 * Opciones del hook `useCategorias`.
 */
interface UseCategoriasOptions {
    withProblemCount?: boolean;
    includeAll?: boolean;
}

/**
 * Función para obtener y procesar las categorías desde Supabase.
 */
const fetchCategorias = async (withProblemCount: boolean): Promise<Categoria[]> => {
    const query = withProblemCount
        ? supabase.from("categorias").select("*, problems:problemas(count)")
        : supabase.from("categorias").select("*");

    // ✅ Usamos el tipo genérico que da Supabase
    const { data: categoriasData, error: catError } = await query as {
        data: SupabaseCategoriaRaw[] | null;
        error: { message: string } | null;
    };

    if (catError) throw new Error(catError.message);

    return (categoriasData || []).map((cat): Categoria => {
        const IconComponent =
            LucideIcons[cat.icono as keyof typeof LucideIcons] || HomeIcon;

        const problemCount = withProblemCount
            ? Array.isArray(cat.problems)
                ? cat.problems[0]?.count ?? 0
                : 0
            : typeof cat.problems === "number"
                ? cat.problems
                : 0;

        return {
            id: cat.id,
            nombre: cat.nombre,
            icono: IconComponent as FC<{ className?: string }>,
            color: cat.color,
            descripcion_breve: cat.descripcion_breve ?? "",
            problems: problemCount,
        };
    });
};

/**
 * Hook personalizado para obtener categorías.
 */
export const useCategorias = (options: UseCategoriasOptions = {}) => {
    const { withProblemCount = false, includeAll = false } = options;

    const { data: categorias, isLoading, error } = useQuery<Categoria[]>({
        queryKey: ["categorias", { withProblemCount, includeAll }],
        queryFn: async () => {
            const fetchedCategorias = await fetchCategorias(withProblemCount);

            if (includeAll) {
                const totalProblems = withProblemCount
                    ? fetchedCategorias.reduce((sum, cat) => sum + (cat.problems ?? 0), 0)
                    : 0;

                const allCategory: Categoria = {
                    id: "all",
                    nombre: "Todos",
                    icono: BookOpen as FC<{ className?: string }>,
                    descripcion_breve: "Todas las categorías disponibles.",
                    color: "#60A5FA",
                    problems: totalProblems,
                };
                return [allCategory, ...fetchedCategorias];
            }

            return fetchedCategorias;
        },
    });

    return {
        categorias: categorias ?? [],
        loading: isLoading,
        error: error?.message ?? null,
    };
};
