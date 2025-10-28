import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { problems as allProblems, problemDetails } from "@/pages/Problemas/problems.data.ts";

/**
 * Hook para obtener los detalles de un problema específico.
 *
 * @returns Un objeto con los datos del problema, el estado de carga y si se encontró.
 */
export const useProblemDetail = () => {
    const { id } = useParams<{ id: string }>();

    const problem = useMemo(() => {
        if (!id) return null;
        return allProblems.find(p => p.id === id) || null;
    }, [id]);

    const details = useMemo(() => {
        if (!id) return null;
        return problemDetails[id] || null;
    }, [id]);

    const isLoading = !problem && !details; // Simulación de carga
    const found = !!(problem && details);

    return {
        problem,
        details,
        isLoading,
        found,
    };
};