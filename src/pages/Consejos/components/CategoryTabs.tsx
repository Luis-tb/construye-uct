import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge.tsx";
import type { Article } from "@/pages/Consejos/consejos.data.ts";
import type { Categoria } from "@/types";

interface CategoryTabsProps {
    categorias: Categoria[];
    allArticles: Article[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryTabs = (props: CategoryTabsProps) => {
    const { categorias, allArticles, selectedCategory, onCategoryChange } = props;

    return (
        <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="mb-8">
            {/* Ajuste para 7 categorías (incluyendo "Todos") */}
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-8">
                {categorias.map((category) => {
                    const {icono: Icon, id, nombre: label} = category;
                    const count = allArticles.filter(
                        (a) => id === "all" || a.category === id
                    ).length;
                    return (
                        <TabsTrigger key={id} value={id} className="flex items-center gap-2">
                            <Icon className="w-4 h-4"/>
                            <span className="hidden sm:inline">{label}</span>
                            <Badge variant="secondary" className="ml-1">{count}</Badge>
                        </TabsTrigger>
                    );
                })}
            </TabsList>

            {/* El contenido (ArticleGrid) se renderizará ahora en el componente padre (TipsPage) */}
        </Tabs>
    );
};