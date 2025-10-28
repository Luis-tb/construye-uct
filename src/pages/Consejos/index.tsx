import { useConsejos } from "@/pages/Consejos/hooks/useConsejos.ts";
import { TipsHeader } from "@/pages/Consejos/components/TipsHeader.tsx";
import { FeaturedArticles } from "@/pages/Consejos/components/FeaturedArticles.tsx";
import { CategoryTabs } from "@/pages/Consejos/components/CategoryTabs.tsx";
import { ArticleGrid } from "@/pages/Consejos/components/ArticleGrid.tsx";
import { CtaSection } from "@/pages/Consejos/components/CtaSection.tsx";
import { Loader2, AlertTriangle } from "lucide-react";

export default function TipsPage() {
    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        savedArticles, toggleSaveArticle,
        categorias,
        allArticles, // 💡 Obtenemos la lista completa
        featuredArticles,
        filteredArticles,
        getDifficultyColor,
        isLoading, // 💡 Obtenemos el estado de carga
        articlesError,     // 💡 Obtenemos el estado de error
    } = useConsejos();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <TipsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {/* 💡 MEJORA: Renderizado condicional basado en el estado de la carga */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                    </div>
                ) : articlesError ? (
                    <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-red-800">Error al cargar los artículos</h3>
                        <p className="text-red-600 mt-2">
                            No se pudieron obtener los datos. Por favor, intenta de nuevo más tarde.
                        </p>
                    </div>
                ) : (
                    <>
                        <CategoryTabs
                            categorias={categorias}
                            allArticles={allArticles} // 💡 CORRECCIÓN: Pasamos la lista completa y sin filtrar
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />

                        {/* Se muestra solo si no hay búsqueda y la categoría es "Todos" */}
                        {!searchTerm && selectedCategory === "all" && (
                            <FeaturedArticles articles={featuredArticles} getDifficultyColor={getDifficultyColor} />
                        )}

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
                    </>
                )}

                <CtaSection />
            </div>
        </div>
    );
}