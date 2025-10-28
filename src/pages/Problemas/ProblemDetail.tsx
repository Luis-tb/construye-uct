import {Button} from "@/components/ui/button.tsx";
import {AlertTriangle, ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/routes.ts";
import {useProblemDetail} from "@/pages/Problemas/hooks/useProblemDetail.ts";
import {ProblemHeader} from "@/pages/Problemas/components/detail/ProblemHeader.tsx";
import {ProblemContent} from "@/pages/Problemas/components/detail/ProblemContent.tsx";
import {ProfessionalCta} from "@/pages/Problemas/components/detail/ProfessionalCta.tsx";
import {ProblemDetailSkeleton} from "@/pages/Problemas/components/detail/ProblemDetailSkeleton.tsx";

export default function ProblemDetail() {
    const navigate = useNavigate();
    const {problem, details, isLoading, isError} = useProblemDetail(); // Obtenemos las guías

    if (isLoading) {
        return <ProblemDetailSkeleton />;
    }

    if (isError || !problem || !details) {
        return (
            <div className="text-center py-20">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500"/>
                <h2 className="mt-4 text-xl font-bold">Problema no encontrado</h2>
                <p className="mt-2 text-gray-600">No pudimos encontrar los detalles para este problema.</p>
                <Button className="mt-6" onClick={() => navigate(ROUTES.PROBLEMS_SOLUTIONS)}>
                    Volver a Problemas Comunes
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => navigate(ROUTES.PROBLEMS_SOLUTIONS)}
                >
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Volver a problemas comunes
                </Button>

                <div className="max-w-4xl mx-auto">
                    <ProblemHeader title={problem.title} image={problem.image}/>
                    <ProblemContent problem={details}/>
                    <ProfessionalCta/>
                </div>
            </div>
        </div>
    );
}
