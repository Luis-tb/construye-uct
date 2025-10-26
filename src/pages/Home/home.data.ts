import {
    CheckCircle2,
    Clock,
    Droplet,
    Hammer,
    LayoutGrid,
    Lightbulb,
    Search,
    Star,
    Triangle,
    Users,
    Zap
} from "lucide-react";

export const stats = [
    {number: "10,000+", label: "Problemas Resueltos", icon: CheckCircle2},
    {number: "5,000+", label: "Profesionales Certificados", icon: Users},
    {number: "4.9/5", label: "Calificación Promedio", icon: Star},
    {number: "24/7", label: "Soporte Disponible", icon: Clock},
];

export const categories = [
    {
        id: "foundations",
        title: "Cimientos",
        icon: LayoutGrid,
        color: "from-orange-500 to-orange-600",
        problems: 3,
        description: "Grietas, hundimientos, asentamientos",
    },
    {
        id: "walls",
        title: "Paredes",
        icon: Hammer,
        color: "from-purple-500 to-purple-600",
        problems: 4,
        description: "Grietas, humedad, fisuras",
    },
    {
        id: "roofs",
        title: "Techos",
        icon: Triangle,
        color: "from-red-500 to-red-600",
        problems: 3,
        description: "Goteras, hundimientos, grietas",
    },
    {
        id: "electrical",
        title: "Electricidad",
        icon: Zap,
        color: "from-yellow-500 to-yellow-600",
        problems: 4,
        description: "Fallas, chispas, sobrecargas",
    },
    {
        id: "plumbing",
        title: "Plomería",
        icon: Droplet,
        color: "from-blue-500 to-blue-600",
        problems: 3,
        description: "Fugas, obstrucciones, baja presión",
    },
];

export const howItWorks = [
    {
        step: "1",
        title: "Identifica tu problema",
        description:
            "Explora nuestra base de datos con más de 17 problemas comunes del hogar organizados por categorías.",
        icon: Search,
    },
    {
        step: "2",
        title: "Sigue tutoriales o solicita ayuda",
        description:
            "Aprende a resolver problemas sencillos con nuestras guías paso a paso o solicita un profesional certificado.",
        icon: Lightbulb,
    },
    {
        step: "3",
        title: "Resuelve tu problema",
        description:
            "Completa la reparación tú mismo o recibe múltiples cotizaciones de profesionales verificados en minutos.",
        icon: CheckCircle2,
    },
];

export const testimonials = [
    {
        name: "María González",
        role: "Propietaria en CDMX",
        image: "https://images.unsplash.com/photo-1747018838524-71c9f55e9db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGhvbWVvd25lciUyMGZhbWlseXxlbnwxfHx8fDE3NjEyNzcwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        text: "Encontré un profesional excelente en menos de 2 horas. Los tutoriales me ayudaron a entender el problema antes de solicitar ayuda.",
        rating: 5,
    },
    {
        name: "Carlos Ramírez",
        role: "Propietario en Monterrey",
        image: "https://images.unsplash.com/photo-1678803262992-d79d06dd5d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb250cmFjdG9yJTIwd29ya2VyfGVufDF8fHx8MTc2MTI3NzAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        text: "La plataforma es muy fácil de usar. Recibí 5 cotizaciones y pude elegir el mejor precio y reputación. 100% recomendado.",
        rating: 5,
    },
    {
        name: "Ana Martínez",
        role: "Propietaria en Guadalajara",
        image: "https://images.unsplash.com/photo-1651766287249-cb882405ba7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzYxMjc3MDM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        text: "Los consejos preventivos me ahorraron miles de pesos. Ahora hago mantenimiento regular gracias a sus tutoriales.",
        rating: 5,
    },
];

export const faqs = [
    {
        question: "¿Cómo funciona el sistema de cotizaciones?",
        answer:
            "Publicas tu problema con fotos y descripción. Los profesionales certificados de tu zona te envían cotizaciones en minutos. Tú eliges basándote en precio, reputación y disponibilidad. No hay compromisos hasta que aceptes una cotización.",
    },
    {
        question: "¿Los profesionales están verificados?",
        answer:
            "Sí, todos nuestros profesionales pasan por un proceso de verificación que incluye: validación de credenciales, revisión de experiencia, verificación de antecedentes y evaluación de trabajos anteriores. Solo el 30% de los aplicantes son aceptados.",
    },
    {
        question: "¿Qué pasa si no estoy satisfecho con el trabajo?",
        answer:
            "Contamos con una garantía de satisfacción. Si el trabajo no cumple con lo acordado, nuestro equipo media entre tú y el profesional. En casos extremos, conectamos con otro profesional sin costo adicional para ti.",
    },
    {
        question: "¿Tiene costo usar la plataforma?",
        answer:
            "El acceso a tutoriales, guías y la exploración de problemas comunes es 100% gratuito. Solo cobramos una pequeña comisión (8%) cuando contratas un profesional a través de nuestra plataforma, ya incluida en las cotizaciones.",
    },
    {
        question: "¿Puedo resolver problemas yo mismo?",
        answer:
            "¡Por supuesto! Nuestra sección de consejos y tutoriales está diseñada para que puedas resolver problemas sencillos por tu cuenta. Cada tutorial indica el nivel de dificultad y te dice cuándo es mejor llamar a un profesional.",
    },
];

export const professionals = [
    {
        name: "Ing. Roberto Silva",
        specialty: "Estructuras",
        rating: 4.9,
        jobs: 245,
        verified: true,
    },
    {
        name: "Mtro. Luis Hernández",
        specialty: "Electricidad",
        rating: 5.0,
        jobs: 189,
        verified: true,
    },
    {
        name: "Téc. Ana Ramírez",
        specialty: "Plomería",
        rating: 4.8,
        jobs: 312,
        verified: true,
    },
];