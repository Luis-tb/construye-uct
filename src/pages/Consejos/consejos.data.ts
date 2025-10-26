import {
    BookOpen,
    Droplet,
    Hammer,
    Paintbrush,
    Zap
} from "lucide-react";

export interface Article {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    readTime: string;
    difficulty: "Fácil" | "Intermedio" | "Avanzado";
    views: string;
    rating: number;
    tags: string[];
    featured?: boolean;
}

export interface VideoTutorial {
    id: number;
    title: string;
    duration: string;
    thumbnail: string;
    category: string;
}

export const categories = [
    {id: "all", label: "Todos", icon: BookOpen},
    {id: "estructura", label: "Estructura", icon: Hammer},
    {id: "electricidad", label: "Electricidad", icon: Zap},
    {id: "pintura", label: "Pintura", icon: Paintbrush},
    {id: "plomeria", label: "Plomería", icon: Droplet},
];

export const articles: Article[] = [
    // ESTRUCTURA
    {
        id: 1,
        title: "Cómo detectar problemas estructurales a tiempo",
        category: "estructura",
        image: "https://images.unsplash.com/photo-1628002580365-f3c0a322d577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0b29scyUyMHR1dG9yaWFsfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Aprende a identificar señales de alerta en muros, vigas y cimientos antes de que sea tarde. Incluye checklist descargable.",
        readTime: "5 min",
        difficulty: "Fácil",
        views: "12.5k",
        rating: 4.8,
        tags: ["Prevención", "Seguridad", "Inspección"],
        featured: true,
    },
    {
        id: 5,
        title: "Reparación de grietas: Paso a paso",
        category: "estructura",
        image: "https://images.unsplash.com/photo-1608752503578-52f35965e3d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXklMjBob21lJTIwcmVwYWlyJTIwdG9vbHN8ZW58MXx8fHwxNzYxMjc2MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Tutorial detallado para reparar grietas superficiales en tus paredes con materiales accesibles.",
        readTime: "7 min",
        difficulty: "Intermedio",
        views: "8.2k",
        rating: 4.6,
        tags: ["DIY", "Reparación", "Tutorial"],
    },
    {
        id: 9,
        title: "Refuerzo de cimientos: Guía completa",
        category: "estructura",
        image: "https://images.unsplash.com/photo-1731168273756-e02cae42265b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW1wcm92ZW1lbnQlMjByZW5vdmF0aW9ufGVufDF8fHx8MTc2MTE5OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Técnicas profesionales para reforzar cimientos débiles y prevenir asentamientos futuros.",
        readTime: "12 min",
        difficulty: "Avanzado",
        views: "5.8k",
        rating: 4.9,
        tags: ["Profesional", "Técnico", "Cimientos"],
    },
    {
        id: 13,
        title: "Mantenimiento preventivo de estructuras",
        category: "estructura",
        image: "https://images.unsplash.com/photo-1628002580365-f3c0a322d577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0b29scyUyMHR1dG9yaWFsfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Calendario anual de inspecciones y mantenimiento para mantener tu casa en perfecto estado.",
        readTime: "6 min",
        difficulty: "Fácil",
        views: "9.3k",
        rating: 4.7,
        tags: ["Mantenimiento", "Prevención", "Checklist"],
    },

    // PINTURA
    {
        id: 2,
        title: "Guía completa para pintar paredes como profesional",
        category: "pintura",
        image: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGhvbWUlMjByZW5vdmF0aW9ufGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Técnicas, materiales y consejos para lograr un acabado perfecto en tu hogar sin contratar pintores.",
        readTime: "8 min",
        difficulty: "Intermedio",
        views: "15.2k",
        rating: 4.9,
        tags: ["DIY", "Decoración", "Tutorial"],
        featured: true,
    },
    {
        id: 7,
        title: "Elección de colores: Psicología del color en el hogar",
        category: "pintura",
        image: "https://images.unsplash.com/photo-1632489753406-52689c507a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMHBhaW50aW5nJTIwd2FsbHN8ZW58MXx8fHwxNzYxMjc2MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Aprende a elegir los colores perfectos para cada espacio según su función y ambiente deseado.",
        readTime: "6 min",
        difficulty: "Fácil",
        views: "11.7k",
        rating: 4.8,
        tags: ["Diseño", "Colores", "Decoración"],
    },
    {
        id: 11,
        title: "Texturas decorativas: Técnicas avanzadas",
        category: "pintura",
        image: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGhvbWUlMjByZW5vdmF0aW9ufGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Descubre técnicas profesionales para crear texturas únicas: estucado, esponjado, y más.",
        readTime: "10 min",
        difficulty: "Avanzado",
        views: "6.4k",
        rating: 4.7,
        tags: ["Avanzado", "Técnicas", "Decoración"],
    },

    // ELECTRICIDAD
    {
        id: 3,
        title: "Instalación eléctrica segura: Lo que debes saber",
        category: "electricidad",
        image: "https://images.unsplash.com/photo-1751486289943-0428133c367c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcmVwYWlyfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Normas de seguridad y mejores prácticas para evitar riesgos eléctricos en casa.",
        readTime: "6 min",
        difficulty: "Intermedio",
        views: "10.1k",
        rating: 4.8,
        tags: ["Seguridad", "Electricidad", "Normas"],
        featured: true,
    },
    {
        id: 6,
        title: "Ahorro de energía eléctrica en el hogar",
        category: "electricidad",
        image: "https://images.unsplash.com/photo-1751486289943-0428133c367c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcmVwYWlyfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Tips prácticos para reducir tu consumo eléctrico y ahorrar hasta 40% en la factura.",
        readTime: "5 min",
        difficulty: "Fácil",
        views: "13.8k",
        rating: 4.6,
        tags: ["Ahorro", "Energía", "Consejos"],
    },
    {
        id: 10,
        title: "Instalación de interruptores y enchufes",
        category: "electricidad",
        image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Guía paso a paso para instalar y reemplazar interruptores y enchufes de forma segura.",
        readTime: "8 min",
        difficulty: "Intermedio",
        views: "7.9k",
        rating: 4.5,
        tags: ["DIY", "Instalación", "Tutorial"],
    },

    // PLOMERÍA
    {
        id: 4,
        title: "Mantenimiento preventivo de tuberías",
        category: "plomeria",
        image: "https://images.unsplash.com/photo-1738918897772-0ba101be25c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHBpcGVzJTIwcmVwYWlyfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Evita fugas y obstrucciones con estos consejos de mantenimiento periódico para tu sistema de plomería.",
        readTime: "4 min",
        difficulty: "Fácil",
        views: "9.5k",
        rating: 4.7,
        tags: ["Mantenimiento", "Prevención", "Plomería"],
    },
    {
        id: 8,
        title: "Reparación de fugas: Soluciones rápidas",
        category: "plomeria",
        image: "https://images.unsplash.com/photo-1714399647789-2ab9b62d5395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHBsdW1iaW5nJTIwZml4dHVyZXN8ZW58MXx8fHwxNzYxMjc2MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Aprende a identificar y reparar las fugas más comunes en grifos, tuberías y conexiones.",
        readTime: "6 min",
        difficulty: "Intermedio",
        views: "11.2k",
        rating: 4.8,
        tags: ["Reparación", "Urgente", "DIY"],
    },
    {
        id: 12,
        title: "Instalación de sistemas de filtrado de agua",
        category: "plomeria",
        image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Mejora la calidad del agua en tu hogar con sistemas de filtrado. Guía de instalación completa.",
        readTime: "9 min",
        difficulty: "Avanzado",
        views: "5.3k",
        rating: 4.6,
        tags: ["Instalación", "Salud", "Agua"],
    },
    {
        id: 14,
        title: "Destapar drenajes sin químicos dañinos",
        category: "plomeria",
        image: "https://images.unsplash.com/photo-1738918897772-0ba101be25c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHBpcGVzJTIwcmVwYWlyfGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Métodos naturales y efectivos para destapar drenajes sin dañar las tuberías ni el ambiente.",
        readTime: "5 min",
        difficulty: "Fácil",
        views: "14.6k",
        rating: 4.9,
        tags: ["Ecológico", "DIY", "Limpieza"],
    },
];

export const videoTutorials: VideoTutorial[] = [
    {
        id: 1,
        title: "Cómo reparar grietas paso a paso",
        duration: "8:45",
        thumbnail: "https://images.unsplash.com/photo-1608752503578-52f35965e3d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXklMjBob21lJTIwcmVwYWlyJTIwdG9vbHN8ZW58MXx8fHwxNzYxMjc2MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Estructura",
    },
    {
        id: 2,
        title: "Técnicas de pintura profesional",
        duration: "12:30",
        thumbnail: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGhvbWUlMjByZW5vdmF0aW9ufGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Pintura",
    },
    {
        id: 3,
        title: "Instalación eléctrica segura",
        duration: "15:20",
        thumbnail: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Electricidad",
    },
    {
        id: 4,
        title: "Reparar fugas de agua rápidamente",
        duration: "6:15",
        thumbnail: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Plomería",
    },
];

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "Fácil":
            return "bg-green-100 text-green-700";
        case "Intermedio":
            return "bg-yellow-100 text-yellow-700";
        case "Avanzado":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};