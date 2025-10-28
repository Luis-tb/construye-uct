import { useProblems } from "@/pages/Problemas/hooks/useProblems.ts";
import { ProblemsHeader } from "@/pages/Problemas/components/ProblemsHeader.tsx";
import { CategoryFilter } from "@/pages/Problemas/components/CategoryFilter.tsx";
import { ActiveFilterInfo } from "@/pages/Problemas/components/ActiveFilterInfo.tsx";
import { ProblemsGrid } from "@/pages/Problemas/components/ProblemsGrid.tsx";
import { NoResults } from "@/pages/Problemas/components/NoResults.tsx";
import { HelpCta } from "@/pages/Problemas/components/HelpCta.tsx";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function CommonProblemsPage() {
    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        categories,
        filteredProblems,
        getSeverityColor,
        getSeverityLabel,
        clearFilters,
        isLoading,
        categoriesMap,
        error,
    } = useProblems();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <ProblemsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-600">
                        <AlertTriangle className="mx-auto w-12 h-12 mb-4" />
                        <p>
                            Error al cargar los datos:{" "}
                            {
                                // ✅ Solución: Verificamos si el error es un objeto con .message o una simple cadena.
                                typeof error === 'object' && true && 'message' in error
                                    ? error.message
                                    : String(error)
                            }
                        </p>
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        <div className="mb-8">
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                filteredProblemCount={filteredProblems.length}
                            />
                        </div>

                        {selectedCategory !== "all" && (
                            <div className="mb-6">
                                <ActiveFilterInfo categories={categories} selectedCategory={selectedCategory} onClearFilter={() => setSelectedCategory("all")} />
                            </div>
                        )}

                        {filteredProblems.length > 0 ? (
                            <ProblemsGrid problems={filteredProblems} getSeverityColor={getSeverityColor} getSeverityLabel={getSeverityLabel} categoriesMap={categoriesMap} />
                        ) : (
                            <NoResults onClearFilters={clearFilters} />
                        )}

                        {filteredProblems.length > 0 && <HelpCta />}
                    </>
                )}
            </div>
        </div>
    );
}