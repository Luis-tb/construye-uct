import type { Problem } from "@/pages/Problemas/problems.data.ts";
import { ProblemCard } from "@/pages/Problemas/components/ProblemCard.tsx";

interface ProblemsGridProps {
    problems: Problem[];
    getSeverityColor: (severity: string) => string;
    getSeverityLabel: (severity: string) => string;
}

export const ProblemsGrid = ({ problems, getSeverityColor, getSeverityLabel }: ProblemsGridProps) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
                <ProblemCard
                    key={problem.id}
                    problem={problem}
                    severityColor={getSeverityColor(problem.severity)}
                    severityLabel={getSeverityLabel(problem.severity)}
                />
            ))}
        </div>
    );
};