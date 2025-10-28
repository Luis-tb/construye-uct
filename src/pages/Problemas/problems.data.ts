import * as React from "react";
import {
    AlertTriangle,
    ArrowUp,
    Droplet,
    Filter,
    Hammer,
    Home,
    Layers,
    Triangle,
    Wind,
    Wrench,
    Zap
} from "lucide-react";

export interface Problem {
    id: string;
    title: string;
    cause: string;
    image: string;
    icon: React.ElementType;
    category: string;
    severity: "low" | "medium" | "high";
}

export interface Category {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    description: string;
}

export interface ProblemDetailData {
    title: string;
    commonCause: string;
    whyItHappens: string;
    solutions: string[];
}

export const categories: Category[] = [
    {
        id: "all",
        name: "Todos",
        icon: Filter,
        color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        description: "Ver todos los problemas",
    },
    {
        id: "cimientos",
        name: "Cimientos",
        icon: Layers,
        color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
        description: "Problemas en la base de tu hogar",
    },
    {
        id: "paredes",
        name: "Paredes",
        icon: Home,
        color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        description: "Daños y deterioro en muros",
    },
    {
        id: "techos",
        name: "Techos",
        icon: Triangle,
        color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
        description: "Filtraciones y problemas de techo",
    },
    {
        id: "electricidad",
        name: "Electricidad",
        icon: Zap,
        color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        description: "Instalaciones y fallas eléctricas",
    },
    {
        id: "plomeria",
        name: "Plomería",
        icon: Droplet,
        color: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
        description: "Tuberías y sistemas de agua",
    },
];

export const problems: Problem[] = [
    // CIMIENTOS
    {
        id: "foundation-cracks",
        title: "Grietas en cimientos",
        cause: "Asentamiento del terreno o falta de refuerzo",
        image: "https://images.unsplash.com/photo-1641605272318-5cf11f8de2c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VuZGF0aW9uJTIwY29uY3JldGUlMjBjcmFja3N8ZW58MXx8fHwxNzYxMjc1NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: AlertTriangle,
        category: "cimientos",
        severity: "high",
    },
    {
        id: "foundation-settlement",
        title: "Hundimiento de cimientos",
        cause: "Suelo inestable o construcción inadecuada",
        image: "https://images.unsplash.com/photo-1641605272318-5cf11f8de2c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VuZGF0aW9uJTIwY29uY3JldGUlMjBjcmFja3N8ZW58MXx8fHwxNzYxMjc1NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: ArrowUp,
        category: "cimientos",
        severity: "high",
    },
    {
        id: "foundation-moisture",
        title: "Humedad en cimientos",
        cause: "Falta de impermeabilización o drenaje deficiente",
        image: "https://images.unsplash.com/photo-1561370051-f4a3b18e8a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGxlYWslMjBodW1pZGl0eXxlbnwxfHx8fDE3NjExMDQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Droplet,
        category: "cimientos",
        severity: "high",
    },

    // PAREDES
    {
        id: "wall-cracks",
        title: "Grietas en paredes",
        cause: "Asentamiento de cimientos o cambios de temperatura",
        image: "https://images.unsplash.com/photo-1740921303129-126a783b9c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwY3JhY2slMjBkYW1hZ2V8ZW58MXx8fHwxNzYxMTA0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Home,
        category: "paredes",
        severity: "medium",
    },
    {
        id: "wall-humidity",
        title: "Humedad en paredes",
        cause: "Filtraciones de agua o condensación",
        image: "https://images.unsplash.com/photo-1561370051-f4a3b18e8a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGxlYWslMjBodW1pZGl0eXxlbnwxfHx8fDE3NjExMDQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Droplet,
        category: "paredes",
        severity: "medium",
    },
    {
        id: "wall-mold",
        title: "Moho en paredes",
        cause: "Exceso de humedad y poca ventilación",
        image: "https://images.unsplash.com/photo-1561370051-f4a3b18e8a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGxlYWslMjBodW1pZGl0eXxlbnwxfHx8fDE3NjExMDQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Wind,
        category: "paredes",
        severity: "medium",
    },
    {
        id: "wall-paint-peeling",
        title: "Pintura desprendida",
        cause: "Humedad, mala preparación o pintura de baja calidad",
        image: "https://images.unsplash.com/photo-1740921303129-126a783b9c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwY3JhY2slMjBkYW1hZ2V8ZW58MXx8fHwxNzYxMTA0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Home,
        category: "paredes",
        severity: "low",
    },

    // TECHOS
    {
        id: "roof-leaks",
        title: "Goteras en techo",
        cause: "Impermeabilización dañada o tejas rotas",
        image: "https://images.unsplash.com/photo-1702047816443-a115804039bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwbGVhayUyMGRhbWFnZXxlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Triangle,
        category: "techos",
        severity: "high",
    },
    {
        id: "ceiling-stains",
        title: "Manchas en techo",
        cause: "Filtraciones de agua del piso superior o techo",
        image: "https://images.unsplash.com/photo-1644329615817-036a646f9348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwd2F0ZXIlMjBzdGFpbnxlbnwxfHx8fDE3NjEyNzU0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Droplet,
        category: "techos",
        severity: "medium",
    },
    {
        id: "roof-structure",
        title: "Daños estructurales en techo",
        cause: "Vigas dañadas o sobrecarga de peso",
        image: "https://images.unsplash.com/photo-1702047816443-a115804039bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwbGVhayUyMGRhbWFnZXxlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Hammer,
        category: "techos",
        severity: "high",
    },

    // ELECTRICIDAD
    {
        id: "electrical-failures",
        title: "Fallas eléctricas constantes",
        cause: "Instalación antigua o sobrecarga de circuitos",
        image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Zap,
        category: "electricidad",
        severity: "high",
    },
    {
        id: "electrical-sparks",
        title: "Chispas en contactos",
        cause: "Conexiones flojas o cables deteriorados",
        image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Zap,
        category: "electricidad",
        severity: "high",
    },
    {
        id: "electrical-overload",
        title: "Sobrecarga eléctrica",
        cause: "Demasiados aparatos en un mismo circuito",
        image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: AlertTriangle,
        category: "electricidad",
        severity: "medium",
    },

    // PLOMERÍA
    {
        id: "plumbing-leaks",
        title: "Fugas de agua en tuberías",
        cause: "Tuberías oxidadas o conexiones dañadas",
        image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Droplet,
        category: "plomeria",
        severity: "high",
    },
    {
        id: "plumbing-clog",
        title: "Tuberías obstruidas",
        cause: "Acumulación de residuos o objetos extraños",
        image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Wrench,
        category: "plomeria",
        severity: "medium",
    },
    {
        id: "plumbing-pressure",
        title: "Baja presión de agua",
        cause: "Tuberías obstruidas o válvulas cerradas parcialmente",
        image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Droplet,
        category: "plomeria",
        severity: "low",
    },
    {
        id: "plumbing-drain",
        title: "Drenaje lento",
        cause: "Tuberías sucias o con pendiente inadecuada",
        image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        icon: Wrench,
        category: "plomeria",
        severity: "low",
    },
];

export const problemDetails: Record<string, ProblemDetailData> = {
    "wall-cracks": {
        title: "Grietas en paredes",
        commonCause: "Asentamiento de cimientos, cambios bruscos de temperatura o humedad excesiva en los materiales de construcción.",
        whyItHappens: "Las grietas pueden aparecer por diversos factores: movimientos naturales del terreno, mala calidad de materiales, errores en la construcción, o simplemente el paso del tiempo. Las grietas horizontales o en diagonal suelen ser más graves que las verticales.",
        solutions: [
            "Evaluar la profundidad y dirección de la grieta con un profesional",
            "Verificar si la grieta está activa (sigue creciendo) o es estable",
            "Reparar grietas superficiales con sellador elástico",
            "Para grietas estructurales, reforzar con malla y mortero especial",
            "Controlar la humedad y el drenaje alrededor de los cimientos"
        ]
    },
    "foundation-cracks": {
        title: "Grietas en cimientos",
        commonCause: "Asentamiento del terreno, mala compactación del suelo o falta de refuerzo adecuado en el concreto.",
        whyItHappens: "Los cimientos son la base de todo. Si el suelo sobre el que se asientan no es estable o si el diseño de la cimentación fue deficiente, se producirán tensiones que resultan en grietas. Estas son de las más peligrosas para la estructura.",
        solutions: [
            "Contactar a un ingeniero estructural para una evaluación inmediata",
            "Realizar un estudio de suelos para determinar la causa del asentamiento",
            "Inyección de resinas epóxicas para sellar y reforzar grietas",
            "Refuerzo de la cimentación con micropilotes o recalce",
            "Mejorar el sistema de drenaje perimetral para evitar la erosión del suelo"
        ]
    },
    "wall-humidity": {
        title: "Humedad y filtraciones",
        commonCause: "Impermeabilización deficiente, tuberías dañadas, o condensación por falta de ventilación.",
        whyItHappens: "La humedad puede provenir de múltiples fuentes: lluvia que penetra por fisuras, agua que sube desde el suelo (capilaridad), fugas en tuberías ocultas, o simplemente vapor de agua que se condensa en paredes frías.",
        solutions: [
            "Identificar la fuente exacta de la humedad (filtración, capilaridad o condensación)",
            "Reparar goteras en techos y sellar fisuras en paredes exteriores",
            "Aplicar sistemas de impermeabilización en azoteas y muros",
            "Revisar y reparar la red de plomería",
            "Mejorar la ventilación de baños y cocinas con extractores",
            "Instalar barreras de vapor o tratamientos anti-humedad por capilaridad"
        ]
    },
    "electrical-failures": {
        title: "Problemas eléctricos",
        commonCause: "Instalación eléctrica antigua, sobrecarga de circuitos, o cables deteriorados.",
        whyItHappens: "Los problemas eléctricos pueden deberse a instalaciones que no cumplen con normativas actuales, uso de cables de calibre inadecuado, conexiones mal hechas, o simplemente el desgaste del tiempo. También puede haber sobrecarga por conectar demasiados aparatos.",
        solutions: [
            "Revisar la instalación con un electricista certificado",
            "Actualizar el tablero eléctrico si es muy antiguo, incluyendo interruptores termomagnéticos",
            "Distribuir la carga eléctrica en varios circuitos independientes",
            "Reemplazar cables deteriorados o de calibre insuficiente",
            "Instalar protecciones como interruptores diferenciales para prevenir descargas",
            "No sobrecargar enchufes con múltiples extensiones o adaptadores"
        ]
    }
    // 💡 Puedes seguir añadiendo los detalles de los otros problemas aquí
    // usando su 'id' como clave.
};