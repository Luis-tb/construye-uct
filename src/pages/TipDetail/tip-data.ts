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