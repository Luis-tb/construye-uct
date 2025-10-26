import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";
import { Clock, Eye, Star, TrendingUp, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPath } from "@/config/routes.ts";
import type { Article } from "@/pages/Consejos/consejos.data.ts";

interface FeaturedArticlesProps {
    articles: Article[];
    getDifficultyColor: (difficulty: string) => string;
}

export const FeaturedArticles = ({ articles, getDifficultyColor }: FeaturedArticlesProps) => {
    const navigate = useNavigate();

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h2 className="text-gray-900">Artículos destacados</h2>
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    Lo más popular
                </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <Card
                        key={article.id}
                        className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                        onClick={() => navigate(createPath('TIP_DETAIL', { id: article.id }))}
                    >
                        <div className="relative h-56 bg-gray-200 overflow-hidden">
                            <ImageWithFallback
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                                <Badge className="bg-blue-600 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Destacado
                                </Badge>
                            </div>
                            <div className="absolute top-3 left-3">
                                <Badge className={getDifficultyColor(article.difficulty)}>
                                    {article.difficulty}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3 text-sm">
                                <Eye className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-500">{article.views} vistas</span>
                                <span className="text-gray-300">•</span>
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-500">{article.readTime}</span>
                            </div>
                            <h3 className="mb-2 text-gray-900 line-clamp-2 font-semibold">{article.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{article.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-gray-700 font-semibold">{article.rating}</span>
                                </div>
                                <Button size="sm" className="group-hover:bg-blue-700 transition-colors">
                                    Leer más
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};