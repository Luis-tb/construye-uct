import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge.tsx";
import type { Article } from "@/pages/Consejos/consejos.data.ts";
import type { Categoria } from "@/types";
import { cn } from "@/lib/utils.ts";
import { useMediaQuery } from "@/hooks/useMediaQuery.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryTabsProps {
    categorias: Categoria[];
    allArticles: Article[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryTabs = (props: CategoryTabsProps) => {
    const { categorias, allArticles, selectedCategory, onCategoryChange } = props;
    const isMobile = useMediaQuery('(max-width: 768px)');

    // ✅ MEJORA: Renderizado condicional para móviles
    if (isMobile) {
        return (
            <div className="mb-8">
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    {/* ✅ MEJORA: Se elimina w-full para que el ancho se ajuste al contenido. */}
                    <SelectTrigger className="w-auto">
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {categorias.map((category) => {
                            const {icono: Icon, id, nombre: label} = category;
                            const count = allArticles.filter(
                                (a) => id === "all" || a.category === id
                            ).length;
                            return (
                                <SelectItem key={id} value={id}>
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        <span>{label}</span>
                                        <Badge variant="secondary" className="ml-1.5">{count}</Badge>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    return (
        <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full mb-8">
            {/*
              ✅ MEJORA DE DISEÑO DESKTOP
              - Se elimina el scroll horizontal (`overflow-x-auto`, `flex-nowrap`).
              - Se añade `flex-wrap` para que las pestañas se ajusten a la siguiente línea si no caben.
            */}
            <TabsList className="h-auto w-full justify-start bg-transparent p-0 border-b rounded-none flex-wrap">
                {categorias.map((category) => {
                    const {icono: Icon, id, nombre: label} = category;
                    const count = allArticles.filter(
                        (a) => id === "all" || a.category === id
                    ).length;
                    return (
                        <TabsTrigger
                            key={id}
                            value={id}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 h-full rounded-none border-b-2 border-transparent bg-transparent text-gray-500 hover:text-blue-600 transition-all duration-200",
                                "data-[state=active]:bg-gray-100 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:border-blue-600"
                            )}
                        >
                            <Icon className="w-4 h-4"/>
                            <span>{label}</span>
                            <Badge variant="secondary" className="ml-1.5">{count}</Badge>
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    );
};