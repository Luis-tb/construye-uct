import {MapPin, Search} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {LocationSearch} from '@/pages/Profesionales/components/form/LocationSearch.tsx';
import {cn} from '@/lib/utils.ts';

type LocationMode = 'gps' | 'search';

interface LocationInputProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
    onUseCurrentLocation: () => void;
    isLoadingLocation: boolean;
    mode: LocationMode;
    onModeChange: (mode: LocationMode) => void;
}

/**
 * @component LocationInput
 * @description Componente que gestiona las diferentes formas de seleccionar una ubicación:
 * GPS, búsqueda por texto o selección en el mapa.
 * @param onLocationSelect - Callback que se ejecuta cuando se selecciona una ubicación desde la búsqueda o el mapa.
 * @param onUseCurrentLocation - Callback para solicitar la ubicación actual del navegador.
 * @param isLoadingLocation - Booleano que indica si se está cargando la ubicación GPS.
 */
export const LocationInput = ({
                                  onLocationSelect,
                                  onUseCurrentLocation,
                                  isLoadingLocation,
                                  mode,
                                  onModeChange
                              }: LocationInputProps) => {

    const Content = () => {
        switch (mode) {
            case 'gps':
                return (
                    <div className="text-center p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600">
                            {isLoadingLocation
                                ? 'Obteniendo tu ubicación...'
                                : 'Ubicación obtenida. Haz clic en "Buscar" para continuar.'}
                        </p>
                    </div>
                );
            case 'search':
            default:
                return <LocationSearch onLocationSelect={onLocationSelect}/>;
        }
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn('flex-1 gap-2', mode === 'gps' && 'bg-blue-100 border-blue-300')}
                    onClick={() => {
                        onModeChange('gps');
                        onUseCurrentLocation();
                    }}
                    disabled={isLoadingLocation}
                >
                    <MapPin className="w-4 h-4"/>
                    Actual
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn('flex-1 gap-2', mode === 'search' && 'bg-blue-100 border-blue-300')}
                    onClick={() => onModeChange('search')}
                >
                    <Search className="w-4 h-4"/>
                    Buscar
                </Button>
            </div>

            <div className="pt-2">
                <Content/>
            </div>
        </div>
    );
};