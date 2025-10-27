import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Navigation} from "lucide-react";
import React from "react";
import {LocationSearch} from "@/pages/Profesionales/components/LocationSearch.tsx";
import {professionalSpecialties} from "@/pages/Profesionales/professionals.data.ts";

interface RequestFormProps {
    onSearch: (e: React.FormEvent) => void;
    specialty: string;
    onSpecialtyChange: (value: string) => void;
    onLocationSelect: (location: { lat: number; lng: number }) => void;
}

export const RequestForm = ({onSearch, specialty, onSpecialtyChange, onLocationSelect}: RequestFormProps) => {
    return (
        <Card className="py-6">
            <CardContent>
                <h3 className="text-gray-900 mb-4">Encuentra a tu experto</h3>
                <form onSubmit={onSearch} className="space-y-4">
                    <div>
                        <Label htmlFor="problem">1. ¿Qué necesitas resolver?</Label>
                        <Select value={specialty} onValueChange={onSpecialtyChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una especialidad"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las especialidades</SelectItem>
                                {Object.entries(professionalSpecialties).map(([key, value]) => (
                                    <SelectItem key={key} value={key}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>2. ¿Dónde es el trabajo?</Label>
                        <p className="text-xs text-gray-500 mb-2">Usa tu ubicación actual, busca una dirección o haz
                            clic en el mapa.</p>
                        <LocationSearch onLocationSelect={onLocationSelect}/>
                    </div>

                    <Button type="submit" className="w-full">
                        <Navigation className="w-4 h-4 mr-2"/>
                        Buscar profesionales
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};