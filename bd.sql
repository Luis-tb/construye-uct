-- ========= MÓDULO 1: PROFESIONALES =========

-- Tabla para almacenar las especialidades (oficios)
CREATE TABLE especialidades
(
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono_url   TEXT -- URL a un ícono representativo (ej: un martillo para carpintería)
);

-- Tabla central de profesionales
CREATE TABLE profesionales
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),     -- Usamos UUID para IDs públicos seguros
    nombres               VARCHAR(100) NOT NULL,
    apellidos             VARCHAR(150) NOT NULL,
    telefono              VARCHAR(20) UNIQUE,
    email                 VARCHAR(100) UNIQUE,
    experiencia_anios     INT         DEFAULT 0,
    empresa_nombre        VARCHAR(255),
    -- Para búsquedas geoespaciales (requiere la extensión postgis en Supabase)
    ubicacion GEOGRAPHY(Point, 4326),
    direccion_referencial TEXT,
    perfil_conadis        BOOLEAN     DEFAULT FALSE,
    fecha_registro TIMESTAMPTZ DEFAULT NOW(),
    estado                VARCHAR(20) DEFAULT 'activo' -- Ej: 'activo', 'inactivo', 'verificando'
);

-- Tabla para certificaciones de cada profesional
CREATE TABLE certificaciones
(
    id                SERIAL PRIMARY KEY,
    profesional_id UUID REFERENCES profesionales(id) ON DELETE CASCADE,
    nombre_estandar   VARCHAR(255) NOT NULL,
    codigo_estandar   VARCHAR(50),
    fecha_evaluacion  DATE,
    fecha_vencimiento DATE
);

-- Tabla PIVOTE para la relación MUCHOS-A-MUCHOS entre profesionales y especialidades
CREATE TABLE profesional_especialidades
(
    profesional_id UUID REFERENCES profesionales(id) ON DELETE CASCADE,
    especialidad_id INT REFERENCES especialidades (id) ON DELETE CASCADE,
    PRIMARY KEY (profesional_id, especialidad_id)
);


-- ========= MÓDULO 2: CONTENIDO (GUÍAS Y PROBLEMAS) =========

-- Tipo de dato personalizado para diferenciar guías de problemas
CREATE
TYPE tipo_contenido AS ENUM ('guia_paso_a_paso', 'problema_solucion');

-- Tabla para herramientas
CREATE TABLE herramientas
(
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(150) NOT NULL UNIQUE,
    imagen_url TEXT
);

-- Tabla para insumos (materiales)
CREATE TABLE insumos
(
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(150) NOT NULL UNIQUE,
    imagen_url TEXT
);

-- Tabla principal de contenido
CREATE TABLE articulos
(
    id                  SERIAL PRIMARY KEY,
    titulo              VARCHAR(255) NOT NULL,
    slug                VARCHAR(255) NOT NULL UNIQUE, -- Para URLs amigables (ej: como-cambiar-un-foco)
    descripcion_corta   TEXT,
    tipo tipo_contenido NOT NULL,
    dificultad          VARCHAR(50),                  -- Ej: 'Fácil', 'Intermedio', 'Difícil'
    costo_estimado_min  DECIMAL(10, 2),
    costo_estimado_max  DECIMAL(10, 2),
    tiempo_estimado_min INT,                          -- en minutos
    tiempo_estimado_max INT,                          -- en minutos
    fecha_publicacion TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para los pasos de cada artículo
CREATE TABLE pasos
(
    id                   SERIAL PRIMARY KEY,
    articulo_id          INT REFERENCES articulos (id) ON DELETE CASCADE,
    numero_paso          INT  NOT NULL,
    titulo_paso          VARCHAR(255),
    instruccion          TEXT NOT NULL,
    ilustracion_url      TEXT,
    alt_text_ilustracion VARCHAR(255) -- Texto alternativo para accesibilidad
);

-- Tablas PIVOTE para relacionar artículos con herramientas e insumos
CREATE TABLE articulo_herramientas
(
    articulo_id    INT REFERENCES articulos (id) ON DELETE CASCADE,
    herramienta_id INT REFERENCES herramientas (id) ON DELETE CASCADE,
    PRIMARY KEY (articulo_id, herramienta_id)
);

CREATE TABLE articulo_insumos
(
    articulo_id INT REFERENCES articulos (id) ON DELETE CASCADE,
    insumo_id   INT REFERENCES insumos (id) ON DELETE CASCADE,
    PRIMARY KEY (articulo_id, insumo_id)
);


-- ========= EL CONECTOR MÁGICO =========

-- Tabla PIVOTE para relacionar artículos con las especialidades relevantes
CREATE TABLE articulo_especialidades
(
    articulo_id     INT REFERENCES articulos (id) ON DELETE CASCADE,
    especialidad_id INT REFERENCES especialidades (id) ON DELETE CASCADE,
    PRIMARY KEY (articulo_id, especialidad_id)
);


-- ========= MÓDULO 3: INTERACCIÓN Y USUARIOS =========

-- La tabla de usuarios la gestiona Supabase Auth.
-- Solo creamos las tablas que se relacionan con ella.

-- Tabla para reseñas y calificaciones
CREATE TABLE resenas
(
    id           SERIAL PRIMARY KEY,
    -- Hacemos referencia al id del usuario en el sistema de autenticación de Supabase
    usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    profesional_id UUID REFERENCES profesionales(id) ON DELETE CASCADE,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario   TEXT,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW()
);


-- BUENAS PRÁCTICAS DE SUPABASE: Habilitar Row Level Security (RLS)
-- ¡MUY IMPORTANTE! Haz esto para todas tus tablas para controlar el acceso a los datos.
ALTER TABLE especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesionales ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesional_especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE herramientas ENABLE ROW LEVEL SECURITY;
ALTER TABLE insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pasos ENABLE ROW LEVEL SECURITY;
ALTER TABLE articulo_herramientas ENABLE ROW LEVEL SECURITY;
ALTER TABLE articulo_insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE articulo_especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas ENABLE ROW LEVEL SECURITY;

-- Luego deberás crear POLÍTICAS de seguridad para cada tabla, por ejemplo:
-- Permitir que CUALQUIERA pueda leer los artículos
-- CREATE POLICY "Permitir lectura pública de artículos" ON articulos FOR SELECT USING (true);
-- Permitir que solo usuarios autenticados puedan dejar reseñas
-- CREATE POLICY "Permitir a usuarios crear reseñas" ON resenas FOR INSERT WITH CHECK (auth.uid() = usuario_id);