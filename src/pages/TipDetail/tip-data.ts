// TipDetail/tip.data.ts

// --- INTERFACES CORE (Tipado estricto) ---

/**
 * @interface Step Define la estructura para cada paso de la guía.
 */
interface Step {
    number: number;
    title: string;
    description: string;
    tip?: string; // Consejo opcional para el paso
}

/**
 * @interface TipDetail Define la estructura completa de un consejo/tutorial.
 */
export interface TipDetail {
    id: string;
    title: string;
    category: string;
    image: string;
    difficulty: "Fácil" | "Intermedio" | "Avanzado";
    readTime: string;
    views: string;
    rating: number;
    author: string;
    date: string;
    description: string;
    introduction: string;
    materials: string[];
    tools: string[];
    steps: Step[];
    warnings: string[];
    proTips: string[];
    relatedProblems: string[];
}

// --- DATOS MOCK ---

/**
 * @const tipsData Objeto que simula la respuesta de una API, indexado por tipId.
 */
export const tipsData: Record<string, TipDetail> = {
    "1": {
        id: "1",
        title: "Cómo detectar problemas estructurales a tiempo",
        category: "Estructura",
        image: "https://images.unsplash.com/photo-1628002580365-f3c0a322d577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0b29scyUyMHR1dG9yaWFsfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        difficulty: "Fácil",
        readTime: "5 min",
        views: "12.5k",
        rating: 4.8,
        author: "Ing. Carlos Martínez",
        date: "15 Oct 2024",
        description: "Aprende a identificar señales de alerta en muros, vigas y cimientos antes de que sea tarde.",
        introduction: "Los problemas estructurales pueden parecer menores al principio, pero pueden comprometer la seguridad de tu hogar si no se detectan a tiempo. Esta guía te enseñará a realizar inspecciones básicas y reconocer las señales de advertencia más importantes.",
        materials: [
            "Linterna potente",
            "Cinta métrica",
            "Nivel de burbuja",
            "Libreta para notas",
            "Cámara fotográfica o smartphone"
        ],
        tools: [
            "Escalera",
            "Lupa (opcional)",
            "Detector de humedad (opcional)"
        ],
        steps: [
            {
                number: 1,
                title: "Inspección visual exterior",
                description: "Recorre todo el perímetro de tu casa observando cuidadosamente las paredes exteriores. Busca grietas, hundimientos o abultamientos en los muros. Presta especial atención a las esquinas y zonas cercanas a puertas y ventanas.",
                tip: "Realiza esta inspección con buena luz natural, preferiblemente en la mañana o tarde."
            },
            {
                number: 2,
                title: "Revisar cimientos y base",
                description: "Examina la base de la construcción buscando grietas en los cimientos. Las grietas horizontales o diagonales son más preocupantes que las verticales. Busca también signos de humedad o erosión en la base.",
                tip: "Las grietas más delgadas que un lápiz generalmente no son graves, pero deben monitorearse."
            },
            // ... (otros pasos)
        ],
        warnings: [
            "Si encuentras grietas de más de 5mm de ancho, especialmente en cimientos, consulta a un ingeniero estructural de inmediato.",
            "Las grietas que aparecen súbitamente o crecen rápidamente requieren atención profesional urgente.",
            "No ignores múltiples señales combinadas (grietas + puertas atoradas + pisos desnivelados)."
        ],
        proTips: [
            "Realiza inspecciones después de lluvias fuertes o eventos sísmicos.",
            "Mantén un registro fotográfico trimestral para detectar cambios graduales.",
            "Las inspecciones en diferentes estaciones pueden revelar problemas relacionados con temperatura y humedad.",
            "Considera contratar una inspección profesional anual como medida preventiva."
        ],
        relatedProblems: ["Grietas en cimientos", "Grietas en paredes", "Hundimiento de cimientos"]
    },
    "2": {
        id: "2",
        title: "Guía completa para pintar paredes como profesional",
        category: "Pintura",
        image: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGhvbWUlMjByZW5vdmF0aW9ufGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        difficulty: "Intermedio",
        readTime: "8 min",
        views: "15.2k",
        rating: 4.9,
        author: "Arq. Laura Gómez",
        date: "10 Oct 2024",
        description: "Técnicas y consejos para lograr un acabado profesional en tus paredes.",
        introduction: "Pintar paredes puede parecer sencillo, pero lograr un acabado profesional requiere preparación, técnica y paciencia. Esta guía te llevará paso a paso para que obtengas resultados dignos de un experto.",
        materials: [
            "Pintura de calidad (látex o acrílica)",
            "Primer o sellador",
            // ...
        ],
        tools: [
            "Rodillo de pelo medio (23cm)",
            "Brochas de 2\" y 4\"",
            // ...
        ],
        steps: [
            // ...
        ],
        warnings: [
            // ...
        ],
        proTips: [
            // ...
        ],
        relatedProblems: ["Pintura desprendida", "Moho en paredes", "Humedad en paredes"]
    },
    // ... (otros datos de TipDetail)
};

// Utilidad para facilitar el uso en el componente principal
export const getTipDetail = (id: string): TipDetail | undefined => {
    // En un entorno real, esto sería una llamada a la API o a un servicio de caché.
    return tipsData[id];
};