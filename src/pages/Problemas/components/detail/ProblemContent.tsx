import { Card, CardContent } from "@/components/ui/card.tsx";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { ProblemDetailData } from "@/types.ts"; // Importar desde types.ts

interface ProblemContentProps {
    problem: ProblemDetailData;
}

export const ProblemContent = ({ problem }: ProblemContentProps) => (
    <div className="space-y-6">
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                        <h2 className="mb-2 text-gray-900">Causa más común</h2>
                        <p className="text-gray-700">{problem.commonCause}</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-6">
                <h2 className="mb-3 text-gray-900">¿Por qué ocurre?</h2>
                <p className="text-gray-700 leading-relaxed">{problem.whyItHappens}</p>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-6">
                <h2 className="mb-4 text-gray-900">Posibles soluciones</h2>
                <ul className="space-y-3">
                    {problem.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{solution}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </div>
);