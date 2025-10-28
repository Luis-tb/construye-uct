import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import {Badge} from "@/components/ui/badge.tsx";

interface ProblemsHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const ProblemsHeader = ({ searchTerm, onSearchChange }: ProblemsHeaderProps) => {
    return (
        <div className="max-w-4xl mx-auto mb-12 text-center">
            <Badge className="mb-4">Problemas Comunes</Badge>
            <p className="text-gray-600 mb-8">
                Identifica y soluciona los problemas más frecuentes en tu hogar
            </p>
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input type="text" placeholder="¿Qué problema tienes en casa?" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="pl-10 py-6" />
            </div>
        </div>
    );
};