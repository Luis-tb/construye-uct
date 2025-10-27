import {Card, CardContent} from "@/components/ui/card.tsx";
import {ArrowUpDown, CheckCircle2, Clock, Filter, MapPin, MessageSquare, Phone, Star, ThumbsUp} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {ImageWithFallback} from "@/components/ImageWithFallback.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import type {Professional} from "@/pages/Profesionales/professionals.data.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import type {SortOption} from "@/pages/Profesionales/hooks/useProfessionals.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Link} from "react-router-dom";

interface ProfessionalsListProps {
    showList: boolean;
    professionals: Professional[];
    selectedProfessional: Professional | null;
    onProfessionalSelect: (pro: Professional | null) => void;
    onResetFilters: () => void;
    sortBy: SortOption;
    onSortChange: (option: SortOption) => void;
}

export const ProfessionalsList = (props: ProfessionalsListProps) => {
    const {
        showList,
        professionals,
        selectedProfessional,
        onProfessionalSelect,
        onResetFilters,
        sortBy,
        onSortChange
    } = props;

    const sortOptions: { value: SortOption, label: string }[] = [
        {value: 'distance', label: 'Más cercanos'},
        {value: 'rating', label: 'Mejor puntuación'},
        {value: 'jobs', label: 'Más trabajos'},
    ];

    if (!showList) {
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

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Profesionales ({professionals.length})</h3>
                {/* DropdownMenu para ordenar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <ArrowUpDown className="w-4 h-4 mr-2"/>
                            Ordenar por: {sortOptions.find(opt => opt.value === sortBy)?.label}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {sortOptions.map(option => (
                            <DropdownMenuItem key={option.value} onClick={() => onSortChange(option.value)}>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* 💡 MEJORA: ScrollArea ahora envuelve la lista y tiene una altura definida para funcionar correctamente */}
            <ScrollArea className="h-[80vh] pr-2">
                <div className="space-y-4 p-1">
                    {professionals.length > 0 ? professionals.map((pro) => (
                        <Link to={`/profesionales/${pro.id}`} key={pro.id} className="block">
                            <Card
                                id={`professional-${pro.id}`}
                                // El evento onMouseEnter ahora selecciona al profesional para destacarlo en el mapa
                                onMouseEnter={() => onProfessionalSelect(pro)}
                                onMouseLeave={() => onProfessionalSelect(null)}
                                // Añadimos un margen inferior a cada tarjeta para separarlas dentro del scroll
                                className={`py-4 mb-3 hover:shadow-lg transition-all cursor-pointer ${selectedProfessional?.id === pro.id ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}
                            >
                                <CardContent>
                                    <div className="flex gap-3">
                                        <div
                                            className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                            <ImageWithFallback src={pro.image} alt={pro.name}
                                                               className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className="text-gray-900 truncate">{pro.name}</h4>
                                                {pro.verified &&
                                                    <Badge
                                                        className="bg-blue-600 text-white p-1.5 rounded-full"><CheckCircle2
                                                        className="w-3 h-3"/></Badge>}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2 truncate">{pro.specialty}</p>
                                            <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2 text-xs text-gray-500">
                                                <div className="flex items-center gap-1"><Star
                                                    className="w-3 h-3 fill-yellow-400 text-yellow-400"/><span
                                                    className="text-gray-900">{pro.rating}</span><span>({pro.reviews})</span>
                                                </div>
                                                <span>•</span>
                                                <div className="flex items-center gap-1"><MapPin
                                                    className="w-3 h-3"/><span>{pro.distance} km</span></div>
                                            </div>
                                            <div className="flex gap-2 mb-2 flex-wrap">
                                                <Badge variant="secondary" className="text-xs"><Clock
                                                    className="w-3 h-3 mr-1"/>{pro.responseTime}</Badge>
                                                <Badge variant="secondary" className="text-xs"><ThumbsUp
                                                    className="w-3 h-3 mr-1"/>{pro.completedJobs} trabajos</Badge>
                                            </div>
                                            {/* 💡 MEJORA: Flujo de acciones rediseñado para mayor claridad */}
                                            <div className="mt-4 flex gap-2">
                                                {/* Dropdown para acciones de contacto */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            className="flex-1 text-xs"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <Phone className="w-3 h-3 mr-1.5"/>
                                                            Contactar
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}>
                                                        <DropdownMenuItem asChild>
                                                            <a href={`tel:${pro.phone}`}
                                                               className="flex items-center cursor-pointer">
                                                                <Phone className="w-4 h-4 mr-2"/> Llamar
                                                            </a>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <a href={`mailto:${pro.email}`}
                                                               className="flex items-center cursor-pointer">
                                                                <MessageSquare className="w-4 h-4 mr-2"/> Enviar Mensaje
                                                            </a>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 text-xs"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Evita la navegación del Link padre
                                                        e.stopPropagation(); // Detiene la propagación del evento
                                                        onProfessionalSelect(pro); // Centra el mapa
                                                    }}
                                                >
                                                    <MapPin className="w-3 h-3 mr-1.5"/>
                                                    Ubicar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )) : (
                        <Card className="p-8 text-center">
                            <div
                                className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="w-8 h-8 text-gray-400"/>
                            </div>
                            <h3 className="text-gray-900 mb-2">No hay resultados</h3>
                            <p className="text-gray-600 mb-4">Ajusta los filtros para ver más profesionales</p>
                            <Button variant="outline" onClick={onResetFilters}>Restablecer filtros</Button>
                        </Card>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};