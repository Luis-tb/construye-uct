import ProblemCard from "./ProblemCard";
import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertTriangle } from "lucide-react";

// It would be better to have a shared types file
interface Problema {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  solucion: string;
  costo: string;
  tiempo: string;
  dificultad: string;
  prevencion: string;
}

interface ProblemListProps {
  problemas: Problema[];
}

export default function ProblemList({ problemas }: ProblemListProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Problemas y Soluciones</h3>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{problemas.length} resultados</span>
          </Badge>
        </div>

        <div className="grid gap-6">
          {problemas.map((problema) => (
            <ProblemCard key={problema.id} problema={problema} />
          ))}
        </div>

        {problemas.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o selecciona una categoría
              diferente.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
