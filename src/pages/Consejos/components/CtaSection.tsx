import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes.ts";

export const CtaSection = () => {
    const navigate = useNavigate();

    return (
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="mb-3 text-white">¿Tienes un problema específico?</h3>
                <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
                    Explora nuestra base de problemas comunes o conecta con un profesional certificado
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Button size="lg" variant="secondary" onClick={() => navigate(ROUTES.PROBLEMS_SOLUTIONS)}>
                        Ver problemas comunes
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" onClick={() => navigate(ROUTES.PROFESSIONALS)}>
                        Solicitar profesional
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};