-- =============================================================================
-- ||                                                                         ||
-- ||             SCRIPT DE INICIALIZACIÓN PARA EL MÓDULO DE PROFESIONALES    ||
-- ||                                                                         ||
-- =============================================================================
-- Este script está diseñado para ser ejecutado en el editor SQL de Supabase.
--
-- IMPORTANTE: Antes de ejecutar, asegúrate de habilitar la extensión `postgis`
-- en tu proyecto de Supabase para el soporte de datos geoespaciales.
-- Ve a: Database -> Extensions -> Busca "postgis" y habilítala.
-- =============================================================================

-- 💡 MEJORA: Habilitar la extensión PostGIS directamente desde el script.
-- Esto hace la migración autocontenida y previene el error si no se ha
-- habilitado manualmente. La extensión se instala en el esquema 'extensions'.
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;



-- =============================================================================
-- TABLA 1: ESPECIALIDADES (OFICIOS)
-- Almacena las categorías de trabajo que los profesionales pueden tener.
-- =============================================================================
CREATE TABLE public.especialidades (
                                       id          SERIAL PRIMARY KEY,
                                       nombre      TEXT NOT NULL UNIQUE,
                                       descripcion TEXT,
    -- Campo para un identificador de icono (ej: 'hammer', 'zap') que se mapeará en el frontend.
                                       icono_slug  VARCHAR(50)
);

COMMENT ON TABLE public.especialidades IS 'Catálogo de oficios o especialidades que un profesional puede ofrecer.';
COMMENT ON COLUMN public.especialidades.nombre IS 'Nombre único de la especialidad (ej: "Plomería y Filtraciones").';
COMMENT ON COLUMN public.especialidades.icono_slug IS 'Identificador para un icono a mostrar en el frontend (ej: "plumbing").';


-- =============================================================================
-- TABLA 2: PROFESIONALES
-- Tabla central que contiene el perfil de cada profesional.
-- =============================================================================
CREATE TABLE public.profesionales (
                                      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- ID del usuario de Supabase Auth si el profesional tiene una cuenta.
                                      usuario_id            UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
                                      nombres               VARCHAR(100) NOT NULL,
                                      apellidos             VARCHAR(150) NOT NULL,
                                      telefono              VARCHAR(20) UNIQUE,
                                      email                 VARCHAR(100) UNIQUE,
                                      experiencia_anios     INT DEFAULT 0,
    -- Datos agregados para optimizar consultas. Se actualizan con triggers.
                                      calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00,
                                      total_resenas         INT DEFAULT 0,
                                      total_trabajos        INT DEFAULT 0,
    -- Para búsquedas geoespaciales. Requiere la extensión `postgis`.
                                      ubicacion             GEOGRAPHY(Point, 4326),
                                      direccion_referencial TEXT,
                                      foto_perfil_url       TEXT,
                                      verificado            BOOLEAN DEFAULT FALSE,
                                      fecha_registro        TIMESTAMPTZ DEFAULT NOW() NOT NULL,
                                      estado                VARCHAR(20) DEFAULT 'activo' NOT NULL CHECK (estado IN ('activo', 'inactivo', 'verificando', 'suspendido'))
);

COMMENT ON TABLE public.profesionales IS 'Perfiles de los profesionales registrados en la plataforma.';
COMMENT ON COLUMN public.profesionales.id IS 'Identificador único universal para el profesional.';
COMMENT ON COLUMN public.profesionales.usuario_id IS 'Vincula al profesional con su cuenta de usuario en Supabase Auth (si la tiene).';
COMMENT ON COLUMN public.profesionales.calificacion_promedio IS 'Calificación promedio calculada a partir de todas las reseñas. Se actualiza vía trigger.';
COMMENT ON COLUMN public.profesionales.ubicacion IS 'Coordenadas geográficas (longitud, latitud) para búsquedas de proximidad.';
COMMENT ON COLUMN public.profesionales.verificado IS 'Indica si el perfil ha sido verificado por la plataforma.';


-- =============================================================================
-- TABLA 3: CERTIFICACIONES
-- Almacena las certificaciones y credenciales de cada profesional.
-- =============================================================================
CREATE TABLE public.certificaciones (
                                        id                SERIAL PRIMARY KEY,
                                        profesional_id    UUID NOT NULL REFERENCES public.profesionales(id) ON DELETE CASCADE,
                                        nombre_estandar   VARCHAR(255) NOT NULL,
                                        entidad_emisora   VARCHAR(255),
                                        fecha_emision     DATE,
                                        fecha_vencimiento DATE,
                                        url_credencial    TEXT -- URL para verificar la credencial
);

COMMENT ON TABLE public.certificaciones IS 'Certificaciones y credenciales obtenidas por los profesionales.';


-- =============================================================================
-- TABLA 4: PROFESIONAL_ESPECIALIDADES (TABLA PIVOTE)
-- Relaciona profesionales con sus especialidades (relación Muchos a Muchos).
-- =============================================================================
CREATE TABLE public.profesional_especialidades (
                                                   profesional_id  UUID NOT NULL REFERENCES public.profesionales(id) ON DELETE CASCADE,
                                                   especialidad_id INT NOT NULL REFERENCES public.especialidades(id) ON DELETE CASCADE,
                                                   PRIMARY KEY (profesional_id, especialidad_id)
);

COMMENT ON TABLE public.profesional_especialidades IS 'Tabla de unión para la relación N:M entre profesionales y especialidades.';


-- =============================================================================
-- TABLA 5: RESEÑAS
-- Almacena las calificaciones y comentarios que los usuarios dejan a los profesionales.
-- =============================================================================
CREATE TABLE public.resenas (
                                id             SERIAL PRIMARY KEY,
    -- ID del usuario que escribe la reseña.
                                usuario_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
                                profesional_id UUID NOT NULL REFERENCES public.profesionales(id) ON DELETE CASCADE,
                                calificacion   INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
                                comentario     TEXT,
                                fecha_creacion TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    -- Evita que un usuario deje múltiples reseñas para el mismo profesional.
                                UNIQUE (usuario_id, profesional_id)
);

COMMENT ON TABLE public.resenas IS 'Calificaciones y comentarios de usuarios sobre el trabajo de un profesional.';
COMMENT ON COLUMN public.resenas.calificacion IS 'Puntuación de 1 a 5 estrellas.';

-- =============================================================================
-- TABLA 6: ESPECIALIDAD_CATEGORIAS (TABLA PIVOTE)
-- Relaciona las especialidades de los profesionales con las categorías de
-- problemas y guías. Esto permite sugerir profesionales relevantes.
-- ASUME que ya existe una tabla `public.categorias` con una PK de tipo INT.
-- =============================================================================
CREATE TABLE public.especialidad_categorias (
                                                especialidad_id INT NOT NULL REFERENCES public.especialidades(id) ON DELETE CASCADE,
    -- Se asume que la tabla `categorias` tiene una PK de tipo SERIAL o INT.
    -- Si la PK de `categorias` es de otro tipo (ej: UUID), ajusta esta línea.
                                                categoria_id    INT NOT NULL REFERENCES public.categorias(id) ON DELETE CASCADE,
                                                PRIMARY KEY (especialidad_id, categoria_id)
);

COMMENT ON TABLE public.especialidad_categorias IS 'Tabla de unión N:M para conectar especialidades con categorías de contenido.';


-- =============================================================================
-- FUNCIONES Y TRIGGERS PARA AUTOMATIZACIÓN
-- Mantienen los datos agregados en la tabla `profesionales` actualizados.
-- =============================================================================

-- 1. Función para recalcular la calificación promedio de un profesional.
CREATE OR REPLACE FUNCTION public.actualizar_calificacion_profesional()
              RETURNS TRIGGER AS $$
BEGIN
UPDATE public.profesionales
SET
    calificacion_promedio = (
        SELECT AVG(calificacion)
        FROM public.resenas
        WHERE profesional_id = NEW.profesional_id
    ),
    total_resenas = (
        SELECT COUNT(*)
        FROM public.resenas
        WHERE profesional_id = NEW.profesional_id
    )
WHERE id = NEW.profesional_id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger que se ejecuta después de insertar una nueva reseña.
CREATE TRIGGER on_new_review
    AFTER INSERT ON public.resenas
    FOR EACH ROW EXECUTE FUNCTION public.actualizar_calificacion_profesional();


-- =============================================================================
-- POLÍTICAS DE SEGURIDAD A NIVEL DE FILA (ROW LEVEL SECURITY - RLS)
-- ¡CRUCIAL PARA LA SEGURIDAD EN SUPABASE!
-- =============================================================================

-- Habilitar RLS en todas las tablas del módulo.
ALTER TABLE public.especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profesionales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profesional_especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resenas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.especialidad_categorias ENABLE ROW LEVEL SECURITY;

-- --- Políticas para `especialidades` ---
-- Cualquiera puede ver las especialidades.
CREATE POLICY "Permitir lectura pública de especialidades"
ON public.especialidades FOR SELECT
                                        USING (true);

-- --- Políticas para `profesionales` ---
-- Cualquiera puede ver los perfiles de los profesionales.
-- Por seguridad, se podría restringir el acceso a `email` y `telefono` solo a usuarios autenticados.
-- Por simplicidad inicial, lo dejamos público.
CREATE POLICY "Permitir lectura pública de profesionales"
ON public.profesionales FOR SELECT
                                       USING (true);

-- Solo el propio profesional (o un admin) puede actualizar su perfil.
CREATE POLICY "Permitir a profesionales actualizar su propio perfil"
ON public.profesionales FOR UPDATE
                                       USING (auth.uid() = usuario_id);

-- --- Políticas para `certificaciones` y `profesional_especialidades` ---
-- Cualquiera puede ver las certificaciones y especialidades de un profesional.
CREATE POLICY "Permitir lectura pública de certificaciones"
ON public.certificaciones FOR SELECT USING (true);

CREATE POLICY "Permitir lectura pública de especialidades de profesionales"
ON public.profesional_especialidades FOR SELECT USING (true);

-- --- Políticas para `especialidad_categorias` ---
-- Cualquiera puede ver las relaciones entre especialidades y categorías.
CREATE POLICY "Permitir lectura pública de relaciones especialidad-categoría"
ON public.especialidad_categorias FOR SELECT USING (true);

-- --- Políticas para `resenas` ---
-- Cualquiera puede leer las reseñas.
CREATE POLICY "Permitir lectura pública de reseñas"
ON public.resenas FOR SELECT
                                 USING (true);

-- Solo usuarios autenticados pueden crear reseñas.
CREATE POLICY "Permitir a usuarios autenticados crear reseñas"
ON public.resenas FOR INSERT
                                 WITH CHECK (auth.role() = 'authenticated');

-- Un usuario solo puede ACTUALIZAR su propia reseña.
CREATE POLICY "Permitir a usuarios actualizar sus propias reseñas"
ON public.resenas FOR UPDATE
                                 USING (auth.uid() = usuario_id);

-- Un usuario solo puede BORRAR su propia reseña.
CREATE POLICY "Permitir a usuarios borrar sus propias reseñas"
ON public.resenas FOR DELETE
                                 USING (auth.uid() = usuario_id);

-- =============================================================================
-- ||                    FUNCIÓN DE BÚSQUEDA GEOESPACIAL (RPC)                ||
-- =============================================================================
-- Esta función se puede llamar desde el cliente como un "Remote Procedure Call".
-- Es la forma más eficiente de buscar profesionales cercanos.
--
-- Uso desde JS: supabase.rpc('nearby_professionals', { lat_in: -8.11, lng_in: -79.02, radius_km_in: 5 })
-- =============================================================================
CREATE OR REPLACE FUNCTION public.nearby_professionals(
    lat_in float,
    lng_in float,
    radius_km_in float
)
              RETURNS TABLE (
    id uuid,
    name text,
    specialty text,
    rating decimal,
    reviews integer,
    distance float,
    location text,
    lat float,
    lng float,
    image text,
    verified boolean,
    "responseTime" text, -- Nombres de columna en camelCase para coincidir con el frontend
    "completedJobs" integer,
    "priceRange" text,
    availability text,
    phone text,
    email text
) AS $$
BEGIN
    RETURN QUERY
    -- 💡 MEJORA: Agrupamos por profesional para evitar duplicados y agregamos las especialidades en un solo string.
    SELECT
        p.id,
        p.nombres || ' ' || p.apellidos AS name,
        string_agg(e.nombre, ', ') AS specialty, -- Agrega las especialidades en "Plomería, Electricidad"
        p.calificacion_promedio AS rating,
        p.total_resenas AS reviews,
        -- Calculamos la distancia en KM y la redondeamos.
        ST_Distance(p.ubicacion, ST_SetSRID(ST_MakePoint(lng_in, lat_in), 4326)::geography) / 1000 AS distance,
        p.direccion_referencial AS location,
        ST_Y(p.ubicacion::geometry) AS lat,
        ST_X(p.ubicacion::geometry) AS lng,
        p.foto_perfil_url AS image,
        p.verificado AS verified,
        '~20 min' AS "responseTime", -- Placeholder, este dato debería estar en la tabla `profesionales`
        p.total_trabajos AS "completedJobs",
        '$' || '$' || '$' AS "priceRange", -- Placeholder. Se concatena para evitar conflicto con dollar-quoting.
        'Disponible hoy' AS availability, -- Placeholder
        p.telefono AS phone,
        p.email AS email
    FROM
        public.profesionales p
            LEFT JOIN public.profesional_especialidades pe ON p.id = pe.profesional_id
            LEFT JOIN public.especialidades e ON pe.especialidad_id = e.id
    WHERE
        -- ST_DWithin es la función clave de PostGIS: busca puntos dentro de un radio (en metros).
        ST_DWithin(p.ubicacion, ST_SetSRID(ST_MakePoint(lng_in, lat_in), 4326)::geography, radius_km_in * 1000)
    GROUP BY
        p.id,
        p.ubicacion -- Es necesario agrupar por la columna usada en ST_Distance
    ;
END;
$$ LANGUAGE plpgsql;


-- =============================================================================
-- ||                             FIN DEL SCRIPT                                ||
-- =============================================================================