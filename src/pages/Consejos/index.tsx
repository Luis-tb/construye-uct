import {useConsejos} from "@/pages/Consejos/hooks/useConsejos.ts";
import {TipsHeader} from "@/pages/Consejos/components/TipsHeader.tsx";
import {FeaturedArticles} from "@/pages/Consejos/components/FeaturedArticles.tsx";
import {CategoryTabs} from "@/pages/Consejos/components/CategoryTabs.tsx";
import {ArticleGrid} from "@/pages/Consejos/components/ArticleGrid.tsx"; // 👈 1. Importar ArticleGrid
import {CtaSection} from "@/pages/Consejos/components/CtaSection.tsx";
import {articles as allArticles} from "@/pages/Consejos/consejos.data.ts";

export default function TipsPage() {
    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        savedArticles, toggleSaveArticle,
        categories,
        featuredArticles, filteredArticles,
        getDifficultyColor
    } = useConsejos();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <TipsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

                <CategoryTabs
                    categories={categories}
                    allArticles={allArticles}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                {/* 💡 MEJORA: Renderizado condicional de Artículos Destacados */}
                {/* Se muestra solo si no hay búsqueda y la categoría es "Todos" */}
                {!searchTerm && selectedCategory === "all" && (
                    <FeaturedArticles articles={featuredArticles} getDifficultyColor={getDifficultyColor}/>
                )}

                {/* 💡 MEJORA: La cuadrícula de artículos ahora se renderiza aquí */}
                {/* Muestra los artículos filtrados por el hook useConsejos */}
                <ArticleGrid
                    articles={filteredArticles}
                    savedArticles={savedArticles}
                    onToggleSave={toggleSaveArticle}
                    getDifficultyColor={getDifficultyColor}
                    onClearFilters={() => {
                        setSelectedCategory("all");
                        setSearchTerm("");
                    }}
                />

                <CtaSection/>
            </div>
        </div>
    );
}