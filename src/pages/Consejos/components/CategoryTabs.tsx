import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge.tsx";
import type {Article, categories as CategoryData} from "@/pages/Consejos/consejos.data.ts";
import {useCategorias} from "@/hooks/useCategorias.ts";

interface CategoryTabsProps {
    categories: typeof CategoryData;
    allArticles: Article[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryTabs = (props: CategoryTabsProps) => {
    const {
        allArticles, selectedCategory, onCategoryChange,
    } = props;

    const {categorias} = useCategorias({withProblemCount: true, includeAll: true})

    return (
        <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
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