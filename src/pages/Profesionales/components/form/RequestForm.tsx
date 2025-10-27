import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Navigation} from "lucide-react";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient.ts";
import {LocationInput} from "@/pages/Profesionales/components/form/LocationInput.tsx";

interface RequestFormProps {
    onSearch: (e: React.FormEvent) => void;
    specialty: string;
    onSpecialtyChange: (value: string) => void;
    onLocationSelect: (location: { lat: number; lng: number }) => void;
    onUseCurrentLocation: () => void;
    isLoadingLocation: boolean;
    locationInputMode: 'gps' | 'search';
    onLocationInputModeChange: (mode: 'gps' | 'search') => void;
    showProfessionals: boolean; // 👈 Prop para saber si deshabilitar el botón
}

export const RequestForm = (props: RequestFormProps) => {
    const { onSearch, specialty, onSpecialtyChange, onLocationSelect, onUseCurrentLocation, isLoadingLocation, locationInputMode, onLocationInputModeChange, showProfessionals } = props;
    // 💡 MEJORA: Obtenemos las especialidades directamente desde Supabase.
    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['specialties'],
        queryFn: async () => {
            const { data, error } = await supabase.from('especialidades').select('id, nombre').order('nombre');
            if (error) throw new Error(error.message);
            return data;
        }
    });

    return (
        <Card className="py-6">
            <CardContent>
                <h3 className="text-gray-900 mb-4">Encuentra a tu experto</h3>
                <form onSubmit={onSearch} className="space-y-4">
                    <div className="space-y-4">
                        <Label htmlFor="problem">1. ¿Qué necesitas resolver?</Label>
                        <Select value={specialty} onValueChange={onSpecialtyChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={isLoading ? "Cargando..." : "Selecciona una especialidad"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las especialidades</SelectItem>
                                {specialties.map((spec) => (
                                    // Usamos el nombre como valor, ya que la RPC filtra por el nombre de la especialidad.
                                    <SelectItem key={spec.id} value={spec.nombre}>
                                        {spec.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label>2. ¿Dónde es el trabajo?</Label>
                        <LocationInput
                            onLocationSelect={onLocationSelect}
                            onUseCurrentLocation={onUseCurrentLocation}
                            isLoadingLocation={isLoadingLocation}
                            mode={locationInputMode}
                            onModeChange={onLocationInputModeChange}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={showProfessionals}>
                        <Navigation className="w-4 h-4 mr-2"/>
                        {showProfessionals ? 'Búsqueda activa...' : 'Buscar profesionales'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};