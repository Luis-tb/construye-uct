import {useConsejos} from "@/pages/Consejos/hooks/useConsejos.ts";
import {TipsHeader} from "@/pages/Consejos/components/TipsHeader.tsx";
import {FeaturedArticles} from "@/pages/Consejos/components/FeaturedArticles.tsx";
import {CategoryTabs} from "@/pages/Consejos/components/CategoryTabs.tsx";
import {VideoTutorials} from "@/pages/Consejos/components/VideoTutorials.tsx";
import {CtaSection} from "@/pages/Consejos/components/CtaSection.tsx";
import {articles as allArticles} from "@/pages/Consejos/consejos.data.ts";

export default function TipsPage() {
    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        savedArticles, toggleSaveArticle,
        categories, videoTutorials,
        featuredArticles, filteredArticles,
        getDifficultyColor
    } = useConsejos();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <TipsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm}/>

                {/* Featured Articles */}
                {!searchTerm && selectedCategory === "all" && (
                    <FeaturedArticles articles={featuredArticles} getDifficultyColor={getDifficultyColor}/>
                )}

                <CategoryTabs
                    categories={categories}
                    allArticles={allArticles}
                    filteredArticles={filteredArticles}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    savedArticles={savedArticles}
                    onToggleSave={toggleSaveArticle}
                    getDifficultyColor={getDifficultyColor}
                    onClearFilters={() => {
                        setSelectedCategory("all");
                        setSearchTerm("");
                    }}
                />

                {/* Video Tutorials Section */}
                {!searchTerm && selectedCategory === "all" && (
                    <VideoTutorials tutorials={videoTutorials}/>
                )}

                <CtaSection/>
            </div>
        </div>
    );
}