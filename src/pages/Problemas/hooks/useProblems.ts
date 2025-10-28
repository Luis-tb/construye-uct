import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient.ts";
import { useCategorias } from "@/hooks/useCategorias.ts";
import type { Problem } from "@/types.ts";
import { useSearchParams } from "react-router-dom";

/**
 * Obtiene los problemas desde Supabase.
 * @returns Una promesa que resuelve a un array de problemas.
 */
const fetchProblems = async (): Promise<Problem[]> => {
    const { data, error } = await supabase
        .from("problemas")
        .select(`
            id,
            nombre,
            descripcion,
            imagen_url,
            dificultad,
            categoria_id
        `);

    if (error) throw new Error(error.message);

    // Mapeamos los datos de Supabase a nuestra interfaz `Problem`
    return (data || []).map(p => ({
        id: p.id,
        title: p.nombre,
        cause: p.descripcion ?? 'Causa no especificada',
        image: p.imagen_url ?? '',
        category: p.categoria_id ?? 'sin-categoria',
        // Usamos directamente el valor de la base de datos, con un fallback.
        severity: p.dificultad ?? 'Desconocida',
    }));
};

/**
 * Hook personalizado para gestionar la lógica de la página de Problemas Comunes.
 * Encapsula el estado de búsqueda, filtrado por categoría y funciones de utilidad.
 */
export const useProblems = () => {
    // Hook para leer los parámetros de la URL.
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get("catId") || "all";

    const [searchTerm, setSearchTerm] = useState("");
    // El estado del filtro de categoría se inicializa con el valor de la URL.
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);


    // 1. Obtenemos las categorías usando el hook `useCategorias`
    const { categorias, loading: loadingCategories, error: errorCategories } = useCategorias({ includeAll: true, withProblemCount: true });

    // 2. Obtenemos todos los problemas usando `react-query`
    const { data: problems = [], isLoading: loadingProblems, error: errorProblems } = useQuery<Problem[]>({
        queryKey: ['problems'],
        queryFn: fetchProblems,
    });

    // Sincroniza el estado del filtro con los parámetros de la URL.
    useEffect(() => {
        if (selectedCategory === 'all') {
            // Si se selecciona "todos", eliminamos el parámetro de la URL.
            searchParams.delete('catId');
        } else {
            searchParams.set('catId', selectedCategory);
        }
        setSearchParams(searchParams, { replace: true }); // `replace: true` evita añadir al historial de navegación.
    }, [selectedCategory, searchParams, setSearchParams]);

    /**
     * Filtra los problemas basándose en la categoría seleccionada y el término de búsqueda.
     */
    const filteredProblems = useMemo(() => {
        return problems.filter((problem) => {
            const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
            const matchesSearch = !searchTerm ||
                problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                problem.cause.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [problems, searchTerm, selectedCategory]);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high": return "bg-red-100 text-red-800";
            case "medium": return "bg-yellow-100 text-yellow-800";
            case "low": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    /**
     * Capitaliza la primera letra de la severidad para mostrarla en la UI.
     * @param severity - El valor de severidad (ej: "alta", "media").
     * @returns El valor con la primera letra en mayúscula (ej: "Alta", "Media").
     */
    const getSeverityLabel = (severity: string) => {
        if (!severity) return "Desconocida";
        return severity.charAt(0).toUpperCase() + severity.slice(1);
    };

    // Función para limpiar los filtros de búsqueda y categoría.
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
    };

    // Combinamos los estados de carga y error de ambas consultas.
    const isLoading = loadingCategories || loadingProblems;
    const error = errorCategories || errorProblems;

    /**
     * Un mapa para acceder eficientemente a los datos de una categoría por su ID.
     */
    const categoriesMap = useMemo(() => {
        return new Map(
            categorias.map(cat => [cat.id, cat])
        );
    }, [categorias]);

    return {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        categories: categorias,
        filteredProblems,
        getSeverityColor,
        getSeverityLabel,
        clearFilters,
        isLoading,
        categoriesMap,
        error,
    };
};