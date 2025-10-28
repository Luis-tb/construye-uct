import { Card, CardContent } from "@/components/ui/card.tsx";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes.ts";

export const ProfessionalCta = () => {
    const navigate = useNavigate();

    return (
        <Card className="bg-blue-50 border-blue-200 mt-8">
            <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="mb-2 text-gray-900">¿Necesitas ayuda profesional?</h3>
                <p className="text-gray-600 mb-4">
                    Contacta con un profesional certificado para una evaluación detallada
                </p>
                <Button size="lg" onClick={() => navigate(ROUTES.PROFESSIONALS)}>
                    Buscar un profesional
                </Button>
            </CardContent>
        </Card>
    );
};