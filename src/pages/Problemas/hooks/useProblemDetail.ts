import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient.ts";
import type { Guia, Problem, ProblemDetailData } from "@/types.ts"; // ✅ Confirmamos que 'Guia' se importa correctamente
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Define la estructura de una guía tal como la devuelve Supabase.
 * Esto nos permite evitar el uso de `any` y tener un tipado más estricto.
 */
type RawGuia = Omit<Guia, 'imagen_url'> & {
    imagen_url: string | null;
};

/**
 * Define la estructura completa de la respuesta de Supabase para un problema detallado.
 * Esto mejora la seguridad de tipos al manejar los datos crudos de la API.
 */
interface SupabaseProblemDetailResponse {
    id: string;
    nombre: string;
    descripcion: string | null;
    imagen_url: string | null;
    dificultad: string | null;
    categoria_id: string | null;
    problema_detalles: {
        causa_comun: string | null;
        porque_ocurre: string | null;
        soluciones: string[] | null;
    } | null; // Puede ser null si no hay detalles relacionados
    guias: RawGuia[]; // Siempre un array, incluso si está vacío
}

interface FullProblemData {
    problem: Problem;
    details: ProblemDetailData;
    guias: Guia[]; // Añadimos las guías
}

/**
 * Obtiene los detalles completos de un problema desde Supabase.
 * @param id - El ID del problema a buscar.
 */
const fetchProblemDetail = async (id: string): Promise<FullProblemData> => {
    const { data, error } = await supabase
        .from('problemas')
        .select(`
            id,
            nombre,
            descripcion,
            imagen_url,
            dificultad,
            categoria_id,
            problema_detalles (
                causa_comun,
                porque_ocurre,
                soluciones
            ),
            guias (
                id,
                titulo,
                contenido,
                tipo,
                imagen_url
            )
        `)
        .eq('id', id)
        .single() as {
        data: SupabaseProblemDetailResponse | null;
        error: PostgrestError | null;
    };

    if (error) throw new Error(`Problema con ID ${id} no encontrado.`);

    // Destructuramos los datos, asegurándonos de que problema_detalles y guias sean arrays o null
    const { problema_detalles, guias: rawGuias, ...problemData } = data!;

    // Mapeamos las guías a la interfaz Guia
    const mappedGuias: Guia[] = (rawGuias || []).map((g: RawGuia) => ({
        id: g.id,
        titulo: g.titulo,
        contenido: g.contenido,
        tipo: g.tipo,
        imagen_url: g.imagen_url ?? undefined, // Convertimos null a undefined para coincidir con la interfaz
    }));

    return {
        problem: {
            id: problemData.id,
            title: problemData.nombre,
            cause: problemData.descripcion ?? '',
            image: problemData.imagen_url ?? '',
            category: problemData.categoria_id ?? '',
            severity: problemData.dificultad as "low" | "medium" | "high",
        },
        // ✅ Mejora: Usar desestructuración con valores por defecto para mayor claridad.
        details: { 
            commonCause: problema_detalles?.causa_comun || 'No especificado',
            whyItHappens: problema_detalles?.porque_ocurre || 'No especificado',
            solutions: problema_detalles?.soluciones || [],
        }, 
        guias: mappedGuias, // Incluimos las guías mapeadas
    };
};

/**
 * Hook para obtener los detalles de un problema específico.
 */
export const useProblemDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['problemDetail', id],
        queryFn: () => fetchProblemDetail(id!),
        enabled: !!id, // La consulta solo se ejecuta si hay un ID
    });

    // Retornamos también las guías
    return {
        problem: data?.problem,
        details: data?.details,
        guias: data?.guias ?? [], // Aseguramos que siempre sea un array
        isLoading,
        isError,
    };
};