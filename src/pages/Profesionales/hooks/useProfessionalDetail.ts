import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient.ts";

// Tipos que ya estaban definidos en el componente, ahora viven en el hook.
export type Review = {
    id: number;
    calificacion: number;
    comentario: string;
    fecha_creacion: string;
    author: {
        id: string;
        raw_user_meta_data?: {
            name?: string;
            avatar_url?: string;
        }
    } | null;
};

export type Certification = {
    id: number;
    nombre_estandar: string;
    entidad_emisora: string;
    fecha_emision: string;
    url_credencial: string | null;
};

export type Specialty = {
    especialidades: {
        id: number;
        nombre: string;
        icono_slug: string;
    }
};

export type ProfessionalProfile = {
    id: string;
    nombres: string;
    apellidos: string;
    foto_perfil_url: string;
    verificado: boolean;
    calificacion_promedio: number;
    total_resenas: number;
    total_trabajos: number;
    experiencia_anios: number;
    direccion_referencial: string;
    telefono: string;
    email: string;
    especialidades: Specialty[];
    certificaciones: Certification[];
    resenas: Review[];
};

/**
 * Hook para obtener los detalles completos de un perfil de profesional.
 * @param professionalId - El ID (UUID) del profesional a cargar.
 */
export const useProfessionalDetail = (professionalId?: string) => {
    const {data, isLoading, error} = useQuery<ProfessionalProfile | null>({
        queryKey: ['professional', professionalId],
        queryFn: async () => {
            if (!professionalId) return null;

            // 💡 CORRECCIÓN: Sintaxis de consulta anidada corregida.
            // Se especifica la tabla pivote y luego la tabla final con sus columnas.
            const {data, error} = await supabase
                .from('profesionales') // 💡 CORRECCIÓN: Se eliminó `!inner` para usar LEFT JOIN por defecto.
                // Esto asegura que se devuelva un profesional aunque no tenga certificaciones o reseñas.
                .select(`
                *,
                especialidades:profesional_especialidades(especialidades(id, nombre, icono_slug)),
                certificaciones(*),
                resenas(*)
            `)
                .eq('id', professionalId)
                .single();

            if (error) throw new Error(error.message);

            return data;
        },
        enabled: !!professionalId,
    });

    return {professional: data, isLoading, error};
};