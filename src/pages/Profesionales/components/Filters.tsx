import {Card, CardContent} from "@/components/ui/card.tsx";
import {Filter} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";

interface FiltersProps {
    maxDistance: number;
    minRating: number;
    onApplyFilters: (filters: { distance: number; rating: number }) => void;
    filteredCount: number;
}

export const Filters = (props: FiltersProps) => {
    const {maxDistance, minRating, onApplyFilters, filteredCount} = props;

    // Estado local para los sliders, inicializado con los valores de la URL (props)
    const [localDistance, setLocalDistance] = useState(maxDistance);
    const [localRating, setLocalRating] = useState(minRating);

    // Sincroniza el estado local si los filtros se resetean desde fuera
    useEffect(() => {
        setLocalDistance(maxDistance);
        setLocalRating(minRating);
    }, [maxDistance, minRating]);

    const handleApply = () => {
        onApplyFilters({distance: localDistance, rating: localRating});
    };

    return (
        <Card className="py-6">
            <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-blue-600"/>
                    <h3 className="text-gray-900">Filtros</h3>
                </div>

                <div className="space-y-6">
                    <div>
                        <Label>Distancia máxima: {localDistance} km</Label>
                        <Slider value={[localDistance]} onValueChange={(v) => setLocalDistance(v[0])} min={1} max={20}
                                step={0.5} className="mt-2"/>
                    </div>

                    <div>
                        <Label>Calificación mínima: {localRating > 0 ? localRating.toFixed(1) : 'Todas'}</Label>
                        <Slider value={[localRating]} onValueChange={(v) => setLocalRating(v[0])} min={0} max={5}
                                step={0.1} className="mt-2"/>
                    </div>

                    <Button onClick={handleApply} className="w-full">Aplicar filtros</Button>

                    <div className="pt-2 border-t border-gray-200">
                        <Badge variant="secondary">
                            {filteredCount} profesionales encontrados
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};