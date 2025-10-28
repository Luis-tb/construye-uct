import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Bookmark, Clock, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPath } from "@/config/routes.ts";
import type { Article } from "@/pages/Consejos/consejos.data.ts";

interface ArticleCardProps {
    article: Article;
    isSaved: boolean;
    onToggleSave: (id: number) => void;
    getDifficultyColor: (difficulty: string) => string;
}

export const ArticleCard = ({ article, isSaved, onToggleSave, getDifficultyColor }: ArticleCardProps) => {
    const navigate = useNavigate();

    return (
        <Card
            key={article.id}
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate(createPath('TIP_DETAIL', { id: article.id }))}
        >
            <div className="relative h-48 bg-gray-200 overflow-hidden">
                <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(article.id);
                        }}
                    >
                        <Bookmark
                            className={`w-4 h-4 ${
                                isSaved ? "fill-blue-600 text-blue-600" : "text-gray-600"
                            }`}
                        />
                    </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                    <Badge className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                    </Badge>
                </div>
            </div>
            <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs">
                    <Eye className="w-3 h-3" />
                    <span>{article.views}</span>
                    <span className="text-gray-300">•</span>
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                    <span className="text-gray-300">•</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{article.rating}</span>
                </div>
                <h3 className="mb-2 text-gray-900 line-clamp-2 font-semibold">{article.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{article.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
                {/* 💡 MEJORA: Se cambia el variant a primario (azul) y se añade cursor-pointer para consistencia visual. */}
                <Button className="w-full transition-colors text-sm cursor-pointer">
                    Leer artículo
                </Button>
            </CardContent>
        </Card>
    );
};