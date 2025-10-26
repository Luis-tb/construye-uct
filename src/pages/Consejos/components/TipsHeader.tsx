import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";

interface TipsHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const TipsHeader = ({ searchTerm, onSearchChange }: TipsHeaderProps) => (
    <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="mb-3 text-gray-900">Consejos y Tutoriales</h1>
        <p className="text-gray-600 mb-8">
            Aprende a mantener y mejorar tu hogar con guías profesionales paso a paso
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
                type="text"
                placeholder="Buscar tutoriales, consejos, técnicas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 py-6"
            />
        </div>
    </div>
);