import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Category } from "@/pages/Problemas/problems.data.ts";

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (id: string) => void;
    getCategoryCount: (id: string) => number;
    filteredProblemCount: number;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, getCategoryCount, filteredProblemCount }: CategoryFilterProps) => {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Categorías</h2>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {filteredProblemCount} problemas encontrados
                </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.id;
                    const count = getCategoryCount(category.id);

                    return (
                        <Card key={category.id} className={`cursor-pointer transition-all hover:shadow-md ${isActive ? "ring-2 ring-blue-500 shadow-md" : ""}`} onClick={() => onCategoryChange(category.id)}>
                            <CardContent className="p-4 text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${isActive ? "bg-blue-600 text-white" : category.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <p className={`text-gray-900 mb-1 ${isActive ? "" : ""}`}>{category.name}</p>
                                <Badge variant="secondary" className="text-xs">{count}</Badge>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};