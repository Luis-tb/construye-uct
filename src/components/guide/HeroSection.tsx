import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function HeroSection({ searchTerm, setSearchTerm }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-background py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
          Soluciones Prácticas para tu Construcción
        </h2>
        <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
          Encuentra respuestas a los problemas más comunes en construcción.
          Información clara y práctica para personas como tú.
        </p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar problema o solución..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3"
          />
        </div>
      </div>
    </section>
  );
}