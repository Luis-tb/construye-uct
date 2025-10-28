import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes.ts";

export const HelpCta = () => {
    const navigate = useNavigate();

    return (
        <Card className="mt-12 mx-auto max-w-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg">
            <CardContent className="p-8 text-center">
                <h3 className="mb-3 text-white text-2xl font-semibold">
                    ¿No encuentras tu problema?
                </h3>
                <p className="mb-6 text-blue-100 text-sm">
                    Conecta con un profesional certificado para recibir ayuda personalizada
                </p>
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate(ROUTES.PROFESSIONALS)}
                >
                    Solicitar Profesional
                </Button>
            </CardContent>
        </Card>

    );
};