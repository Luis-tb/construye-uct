import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import type {SortOption} from "@/pages/Profesionales/hooks/useProfessionals.ts";

interface ProfessionalsListHeaderProps {
    professionalsCount: number;
    sortBy: SortOption;
    onSortChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption, label: string }[] = [
    {value: 'distance', label: 'Más cercanos'},
    {value: 'rating', label: 'Mejor puntuación'},
    {value: 'jobs', label: 'Más trabajos'},
];

export const ProfessionalsListHeader = ({professionalsCount, sortBy, onSortChange}: ProfessionalsListHeaderProps) => (
    <div className="flex items-center justify-between">
        <h3 className="text-gray-900">Profesionales ({professionalsCount})</h3>
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
);