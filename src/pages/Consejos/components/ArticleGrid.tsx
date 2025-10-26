import { Button } from "@/components/ui/button.tsx";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard.tsx";
import type { Article } from "@/pages/Consejos/consejos.data.ts";

interface ArticleGridProps {
    articles: Article[];
    savedArticles: number[];
    onToggleSave: (id: number) => void;
    getDifficultyColor: (difficulty: string) => string;
    onClearFilters: () => void;
}

export const ArticleGrid = ({ articles, savedArticles, onToggleSave, getDifficultyColor, onClearFilters }: ArticleGridProps) => {
    if (articles.length > 0) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        isSaved={savedArticles.includes(article.id)}
                        onToggleSave={onToggleSave}
                        getDifficultyColor={getDifficultyColor}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2 font-semibold">No se encontraron artículos</p>
            <p className="text-gray-400 mb-6">
                Intenta con otra categoría o término de búsqueda
            </p>
            <Button variant="outline" onClick={onClearFilters}>
                Ver todos los artículos
            </Button>
        </div>
    );
};