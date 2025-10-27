import {Card, CardContent} from "@/components/ui/card.tsx";
import {Filter, Phone} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface ProfessionalsListEmptyStatesProps {
    type: 'initial' | 'no-results';
    onResetFilters?: () => void;
}

export const ProfessionalsListEmptyStates = ({type, onResetFilters}: ProfessionalsListEmptyStatesProps) => {
    if (type === 'initial') {
        return (
            <Card className="h-[70vh] flex items-center justify-center">
                <CardContent className="text-center p-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-white"/>
                    </div>
                    <h3 className="mb-2 text-gray-900">Completa el formulario</h3>
                    <p className="text-gray-600">Te mostraremos los mejores profesionales disponibles cerca de ti</p>
                </CardContent>
            </Card>
        );
    }

    if (type === 'no-results') {
        return (
            <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400"/>
                </div>
                <h3 className="text-gray-900 mb-2">No hay resultados</h3>
                <p className="text-gray-600 mb-4">Ajusta los filtros para ver más profesionales</p>
                <Button variant="outline" onClick={onResetFilters}>Restablecer filtros</Button>
            </Card>
        );
    }

    return null;
};