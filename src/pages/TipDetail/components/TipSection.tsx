// TipDetail/components/TipSection.tsx

import React from 'react';
import { Card, CardContent } from "@/components/ui/card.tsx";
import { CheckCircle2, AlertTriangle, Lightbulb, ShoppingCart, TrendingUp } from "lucide-react";

// --- TIPADO DE PROPS ---

interface TipSectionProps {
    title: string;
    items: string[];
    type: 'materials' | 'tools' | 'warnings' | 'proTips';
}

/**
 * @function getStyleAndIcon Define los estilos y el icono basado en el tipo de sección.
 */
const getStyleAndIcon = (type: TipSectionProps['type']) => {
    switch (type) {
        case 'materials':
            return {
                icon: ShoppingCart,
                titleClass: 'text-gray-900',
                itemIconClass: 'text-green-600',
                cardClasses: 'border-l-4 border-blue-600'
            };
        case 'tools':
            return {
                icon: TrendingUp,
                titleClass: 'text-gray-900',
                itemIconClass: 'text-blue-600',
                cardClasses: 'border-l-4 border-blue-600'
            };
        case 'warnings':
            return {
                icon: AlertTriangle,
                titleClass: 'text-red-900',
                itemIconClass: 'text-red-600',
                cardClasses: 'border-red-200 bg-red-50'
            };
        case 'proTips':
            return {
                icon: Lightbulb,
                titleClass: 'text-green-900',
                itemIconClass: 'text-green-600',
                cardClasses: 'border-green-200 bg-green-50'
            };
        default:
            return { icon: CheckCircle2, titleClass: 'text-gray-900', itemIconClass: 'text-gray-700', cardClasses: '' };
    }
};

// --- COMPONENTE ---

/**
 * @component TipSection
 * Componente genérico para renderizar listas de elementos con íconos y estilos específicos.
 */
export const TipSection: React.FC<TipSectionProps> = ({ title, items, type }) => {
    if (items.length === 0) return null;

    const { icon: Icon, titleClass, itemIconClass, cardClasses } = getStyleAndIcon(type);
    const ListItemIcon = (type === 'warnings' || type === 'proTips') ? Icon : CheckCircle2; // Usamos CheckCircle2 para listas normales

    return (
        <Card className={cardClasses}>
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Icon className={`w-5 h-5 ${itemIconClass}`} />
                    <h3 className={`${titleClass} text-lg font-semibold`}>{title}</h3>
                </div>
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <ListItemIcon className={`w-4 h-4 ${itemIconClass} mt-1 flex-shrink-0`} />
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};