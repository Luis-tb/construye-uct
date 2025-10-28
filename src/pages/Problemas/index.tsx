import { useProblems } from "@/pages/Problemas/hooks/useProblems.ts";
import { ProblemsHeader } from "@/pages/Problemas/components/ProblemsHeader.tsx";
import { CategoryFilter } from "@/pages/Problemas/components/CategoryFilter.tsx";
import { ActiveFilterInfo } from "@/pages/Problemas/components/ActiveFilterInfo.tsx";
import { ProblemsGrid } from "@/pages/Problemas/components/ProblemsGrid.tsx";
import { NoResults } from "@/pages/Problemas/components/NoResults.tsx";
import { HelpCta } from "@/pages/Problemas/components/HelpCta.tsx";

export default function CommonProblemsPage() {
    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        categories,
        filteredProblems,
        getCategoryCount,
        getSeverityColor,
        getSeverityLabel,
        clearFilters,
    } = useProblems();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <ProblemsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                <div className="mb-8">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        getCategoryCount={getCategoryCount}
                        filteredProblemCount={filteredProblems.length}
                    />
                </div>

                {selectedCategory !== "all" && (
                    <div className="mb-6">
                        <ActiveFilterInfo categories={categories} selectedCategory={selectedCategory} onClearFilter={() => setSelectedCategory("all")} />
                    </div>
                )}

                {filteredProblems.length > 0 ? (
                    <ProblemsGrid problems={filteredProblems} getSeverityColor={getSeverityColor} getSeverityLabel={getSeverityLabel} />
                ) : (
                    <NoResults onClearFilters={clearFilters} />
                )}

                {filteredProblems.length > 0 && <HelpCta />}
            </div>
        </div>
    );
}