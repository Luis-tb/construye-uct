import { Badge } from "@/components/ui/badge.tsx";
import type { Categoria } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { cn } from "@/lib/utils.ts";
import { useMediaQuery } from "@/hooks/useMediaQuery.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFilterProps {
    categories: Categoria[];
    selectedCategory: string;
    onCategoryChange: (id: string) => void;
    filteredProblemCount: number;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, filteredProblemCount }: CategoryFilterProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // ✅ MEJORA: Renderizado condicional para móviles
    if (isMobile) {
        return (
            <>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-gray-900">Categorías</h2>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {filteredProblemCount} problemas
                    </Badge>
                </div>
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    {/* ✅ MEJORA: Se elimina w-full para que el ancho se ajuste al contenido. */}
                    <SelectTrigger className="w-auto">
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => {
                            const Icon = category.icono;
                            return (
                                <SelectItem key={category.id} value={category.id}>
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        <span>{category.nombre}</span>
                                        <Badge variant="secondary" className="ml-1.5">{category.problems || 0}</Badge>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Categorías</h2>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {filteredProblemCount} problemas encontrados
                </Badge>
            </div>
            
            <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
                {/*
                  ✅ MEJORA DE DISEÑO DESKTOP
                  - Se elimina el scroll horizontal (`overflow-x-auto`, `flex-nowrap`).
                  - Se añade `flex-wrap` para que las pestañas se ajusten a la siguiente línea si no caben.
                */}
                <TabsList className="h-auto w-full justify-start bg-transparent p-0 border-b rounded-none flex-wrap">
                {categories.map((category) => {
                    const Icon = category.icono;
                    const count = category.problems || 0;

                    return (
                        <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 h-full rounded-none border-b-2 border-transparent bg-transparent text-gray-500 hover:text-blue-600 transition-all duration-200",
                                "data-[state=active]:bg-gray-100 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:border-blue-600"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{category.nombre}</span>
                            {/* Mostramos el contador solo si es mayor que cero para 'Todos' */}
                            {(category.id !== 'all' || count > 0) && (
                                <Badge variant="secondary" className="ml-1.5">{count}</Badge>
                            )}
                        </TabsTrigger>
                    );
                })}
                </TabsList>
            </Tabs>
        </>
    );
};