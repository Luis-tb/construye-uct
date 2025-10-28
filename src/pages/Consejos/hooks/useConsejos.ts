import {useCallback, useMemo, useState} from "react";
import {articles, categories, getDifficultyColor, videoTutorials} from "@/pages/Consejos/consejos.data.ts";

/**
 * @module useConsejos
 * @description Hook personalizado para gestionar la lógica y el estado de la página de Consejos.
 * Encapsula el manejo de la búsqueda, el filtrado por categorías y la gestión de artículos guardados.
 */
export const useConsejos = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [savedArticles, setSavedArticles] = useState<number[]>([]);

    /**
     * Artículos destacados, filtrados del array principal.
     * @type {Article[]}
     */
    const featuredArticles = useMemo(() => articles.filter((a) => a.featured), []);

    /**
     * Artículos filtrados según el término de búsqueda y la categoría seleccionada.
     * @type {Article[]}
     */
    const filteredArticles = useMemo(() => {
        // 💡 MEJORA: Se ajusta la lógica para que en "Todos" no se repitan los destacados.
        let articlesToFilter = articles;

        // Si la categoría es "todos" y no hay búsqueda, mostramos solo los no-destacados en la grilla principal.
        if (selectedCategory === "all" && !searchTerm) {
            articlesToFilter = articles.filter(article => !article.featured);
        }

        return articlesToFilter.filter((article) => {
            const matchesCategory = selectedCategory === "all" || article.category === selectedCategory; // El filtro de categoría se mantiene
            const matchesSearch =
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

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
        savedArticles, toggleSaveArticle,
        categories, videoTutorials,
        featuredArticles, filteredArticles,
        getDifficultyColor
    };
}