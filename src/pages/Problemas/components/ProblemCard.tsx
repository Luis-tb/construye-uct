import { Card, CardContent } from "@/components/ui/card.tsx";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { createPath } from "@/config/routes.ts";
import type { Problem } from "@/pages/Problemas/problems.data.ts";

interface ProblemCardProps {
    problem: Problem;
    severityColor: string;
    severityLabel: string;
}

export const ProblemCard = ({ problem, severityColor, severityLabel }: ProblemCardProps) => {
    const navigate = useNavigate();
    const Icon = problem.icon;

    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => navigate(createPath('PROBLEM_DETAIL', { id: problem.id }))}>
            <div className="relative h-48 bg-gray-200 overflow-hidden">
                <ImageWithFallback src={problem.image} alt={problem.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="absolute top-4 right-4">
                    <Badge className={severityColor}>{severityLabel}</Badge>
                </div>
            </div>
            <CardContent className="p-6">
                <h3 className="mb-2 text-gray-900">{problem.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{problem.cause}</p>
                <Button className="w-full group-hover:bg-blue-700 transition-colors">Ver solución</Button>
            </CardContent>
        </Card>
    );
};