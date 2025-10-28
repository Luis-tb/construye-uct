import type { Problem } from "@/types.ts";
import { ProblemCard } from "@/pages/Problemas/components/ProblemCard.tsx";
import type { Categoria } from "@/types.ts";
import { HelpCircle } from "lucide-react";

interface ProblemsGridProps {
    problems: Problem[];
    getSeverityColor: (severity: string) => string;
    getSeverityLabel: (severity: string) => string;
    categoriesMap: Map<string, Categoria>;
}

export const ProblemsGrid = ({ problems, getSeverityColor, getSeverityLabel, categoriesMap }: ProblemsGridProps) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => {
                const category = categoriesMap.get(problem.category);
                return <ProblemCard
                    key={problem.id}
                    problem={problem}
                    icon={category?.icono || HelpCircle}
                    severityColor={getSeverityColor(problem.severity)}
                    severityLabel={getSeverityLabel(problem.severity)}
                    // ✅ DEBUG: Ver las props de severidad antes de pasar a ProblemCard
                    // console.log(`Problem: ${problem.title}, Severity: ${problem.severity}, Color: ${getSeverityColor(problem.severity)}, Label: ${getSeverityLabel(problem.severity)}`);
                />
            })}
        </div>
    );
};