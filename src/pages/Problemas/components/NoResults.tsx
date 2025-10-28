import { Search } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface NoResultsProps {
    onClearFilters: () => void;
}

export const NoResults = ({ onClearFilters }: NoResultsProps) => {
    return (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No se encontraron problemas</p>
            <p className="text-gray-400 mb-6">
                Intenta con otra categoría o término de búsqueda
            </p>
            <Button variant="outline" onClick={onClearFilters}>
                Limpiar filtros
            </Button>
        </div>
    );
};