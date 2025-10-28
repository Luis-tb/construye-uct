import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes.ts";

export const HelpCta = () => {
    const navigate = useNavigate();

    return (
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8 text-center">
                <h3 className="mb-3 text-white">¿No encuentras tu problema?</h3>
                <p className="mb-6 text-blue-100">
                    Conecta con un profesional certificado para recibir ayuda personalizada
                </p>
                <Button size="lg" variant="secondary" onClick={() => navigate(ROUTES.PROFESSIONALS)}>
                    Solicitar Profesional
                </Button>
            </CardContent>
        </Card>
    );
};