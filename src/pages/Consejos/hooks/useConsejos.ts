import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient.ts";
import type { Article } from "@/pages/Consejos/consejos.data.ts";
import { getDifficultyColor, videoTutorials } from "@/pages/Consejos/consejos.data.ts";
import { useCategorias } from "@/hooks/useCategorias.ts";

/**
 * @module useConsejos
 * @description Hook personalizado para gestionar la lógica y el estado de la página de Consejos.
 * Encapsula el manejo de la búsqueda, el filtrado por categorías y la gestión de artículos guardados.
 */
export const useConsejos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [savedArticles, setSavedArticles] = useState<number[]>([]);

    // 💡 MEJORA: Obtenemos las categorías desde su propio hook, centralizando la lógica.
    const { categorias, loading: isLoadingCategories } = useCategorias({ includeAll: true });

    // 💡 NUEVO: Usamos useQuery para obtener los artículos desde Supabase
    const { data: articles = [], isLoading: isLoadingArticles, error: articlesError } = useQuery<Article[]>({
        queryKey: ['articles'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('articulos')
                .select('*, category:category_id') // Renombramos category_id a category para que coincida con la interfaz
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return data || [];
        },
    });

    /**
     * Artículos destacados, filtrados del array principal.
     * @type {Article[]}
     */
    const featuredArticles = useMemo(() => articles.filter((a) => a.featured), [articles]);

    /**
     * Artículos filtrados según el término de búsqueda y la categoría seleccionada.
     * @type {Article[]}
     */
    const filteredArticles = useMemo(() => {
        let articlesToFilter = articles;

        // Si la categoría es "todos" y no hay búsqueda, mostramos solo los no-destacados en la grilla principal.
        if (selectedCategory === "all" && !searchTerm) {
            articlesToFilter = articles.filter(article => !article.featured);
        }

        return articlesToFilter.filter((article) => {
            const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
            const matchesSearch =
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [articles, searchTerm, selectedCategory]);

    /**
     * Alterna el estado de "guardado" de un artículo.
     * @param {number} id - El ID del artículo a guardar/quitar.
     */
    const toggleSaveArticle = useCallback((id: number) => {
        setSavedArticles((prev) =>
            prev.includes(id) ? prev.filter((articleId) => articleId !== id) : [...prev, id]
        );
    }, []);

    return {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        savedArticles, toggleSaveArticle, // <-- Corregido para que coincida con el nombre de la función
        categorias, // <-- Ahora viene de useCategorias
        allArticles: articles, // 💡 NUEVO: Exponemos la lista completa y sin filtrar
        videoTutorials,
        featuredArticles,
        filteredArticles,
        getDifficultyColor,
        isLoading: isLoadingArticles || isLoadingCategories, // Unificamos el estado de carga
        articlesError,     // 💡 NUEVO: Exponemos el estado de error
    };
}