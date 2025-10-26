import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge.tsx";
import {ArticleGrid} from "./ArticleGrid.tsx";
import type {Article, categories as CategoryData} from "@/pages/Consejos/consejos.data.ts";
import {useCategorias} from "@/hooks/useCategorias.ts";

interface CategoryTabsProps {
    categories: typeof CategoryData;
    allArticles: Article[];
    filteredArticles: Article[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    savedArticles: number[];
    onToggleSave: (id: number) => void;
    getDifficultyColor: (difficulty: string) => string;
    onClearFilters: () => void;
}

export const CategoryTabs = (props: CategoryTabsProps) => {
    const {
        allArticles, filteredArticles, selectedCategory, onCategoryChange,
        savedArticles, onToggleSave, getDifficultyColor, onClearFilters
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

            <TabsContent value={selectedCategory}>
                <ArticleGrid articles={filteredArticles} {...{
                    savedArticles,
                    onToggleSave: onToggleSave,
                    getDifficultyColor,
                    onClearFilters
                }} />
            </TabsContent>
        </Tabs>
    );
};