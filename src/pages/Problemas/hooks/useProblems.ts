import { useMemo, useState } from "react";
import { categories, problems } from "@/pages/Problemas/problems.data.ts";

/**
 * Hook personalizado para gestionar la lógica de la página de Problemas Comunes.
 * Encapsula el estado de búsqueda, filtrado por categoría y funciones de utilidad.
 */
export const useProblems = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    /**
     * Filtra los problemas basándose en la categoría seleccionada y el término de búsqueda.
     */
    const filteredProblems = useMemo(() => {
        return problems.filter((problem) => {
            const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
            const matchesSearch =
                problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                problem.cause.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    /**
     * Calcula el número de problemas para una categoría específica.
     * @param categoryId - El ID de la categoría.
     * @returns El número total de problemas en esa categoría.
     */
    const getCategoryCount = (categoryId: string) => {
        if (categoryId === "all") return problems.length;
        return problems.filter((p) => p.category === categoryId).length;
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high": return "bg-red-100 text-red-700";
            case "medium": return "bg-yellow-100 text-yellow-700";
            case "low": return "bg-green-100 text-green-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getSeverityLabel = (severity: string) => {
        switch (severity) {
            case "high": return "Alta prioridad";
            case "medium": return "Media prioridad";
            case "low": return "Baja prioridad";
            default: return "";
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
    };

    return {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        categories,
        filteredProblems,
        getCategoryCount,
        getSeverityColor,
        getSeverityLabel,
        clearFilters,
    };
};