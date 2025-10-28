import {
    BookOpen,
    Droplet,
    Fence,
    Hammer,
    Paintbrush,
    Sparkles,
    Zap,
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
    { id: "all", label: "Todos", icon: BookOpen },
    { id: "estructura", label: "Estructura", icon: Hammer },
    { id: "electricidad", label: "Electricidad", icon: Zap },
    { id: "pintura", label: "Pintura", icon: Paintbrush },
    { id: "plomeria", label: "Plomería", icon: Droplet },
    { id: "techos", label: "Techos", icon: Fence },
    { id: "acabados", label: "Acabados", icon: Sparkles },
];

export const articles: Article[] = [
    {
        id: 1,
        title: "Cómo detectar problemas estructurales a tiempo",
        category: "techos",
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
        id: 5,
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
        id: 8,
        title: "Reparación de fugas de grifos: Soluciones rápidas",
        category: "plomeria",
        image: "https://images.unsplash.com/photo-1714399647789-2ab9b62d5395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHBsdW1iaW5nJTIwZml4dHVyZXN8ZW58MXx8fHwxNzYxMjc2MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Aprende a identificar y reparar las fugas más comunes en grifos, tuberías y conexiones.",
        readTime: "6 min",
        difficulty: "Intermedio",
        views: "11.2k",
        rating: 4.8,
        tags: ["Reparación", "Urgente", "DIY"],
        featured: true,
    },
    {
        id: 13,
        title: "Mantenimiento e impermeabilización de techos",
        category: "techos",
        image: "https://images.unsplash.com/photo-1564883252299-593402391b1d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Guía para prevenir goteras y daños por humedad mediante un correcto mantenimiento del techo.",
        readTime: "7 min",
        difficulty: "Intermedio",
        views: "8.9k",
        rating: 4.7,
        tags: ["Mantenimiento", "Impermeabilizar", "Goteras"],
    },
    {
        id: 15,
        title: "Cómo instalar pisos de vinilo como un experto",
        category: "acabados",
        image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Renueva tus espacios con pisos de vinilo. Te mostramos el proceso de instalación paso a paso.",
        readTime: "10 min",
        difficulty: "Intermedio",
        views: "9.1k",
        rating: 4.8,
        tags: ["DIY", "Pisos", "Renovación"],
    },
];

export const videoTutorials: VideoTutorial[] = [
    {
        id: 1,
        title: "Reparar grietas en paredes",
        duration: "8:45",
        thumbnail: "https://images.unsplash.com/photo-1608752503578-52f35965e3d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXklMjBob21lJTIwcmVwYWlyJTIwdG9vbHN8ZW58MXx8fHwxNzYxMjc2MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Estructura",
    },
    {
        id: 2,
        title: "Pintura profesional para interiores",
        duration: "12:30",
        thumbnail: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGhvbWUlMjByZW5vdmF0aW9ufGVufDF8fHx8MTc2MTEwNDM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Pintura",
    },
    {
        id: 3,
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