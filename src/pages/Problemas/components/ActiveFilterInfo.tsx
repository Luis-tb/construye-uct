import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { Categoria } from "@/types.ts";

interface ActiveFilterInfoProps {
    categories: Categoria[];
    selectedCategory: string;
    onClearFilter: () => void;
}

export const ActiveFilterInfo = ({ categories, selectedCategory, onClearFilter }: ActiveFilterInfoProps) => {
    const category = categories.find((c) => c.id === selectedCategory);
    if (!category) return null;

    const Icon = category.icono;

    return (
        <Card className="ml-4 max-w-lg rounded-lg bg-blue-50 border-blue-200 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-blue-900">
                            Mostrando problemas de: {category.nombre}
                        </p>
                        <p className="text-blue-700">{category.descripcion_breve}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilter}
                    className="text-blue-700 hover:text-blue-900"
                >
                    Ver todos
                </Button>
            </CardContent>
        </Card>

    );
};