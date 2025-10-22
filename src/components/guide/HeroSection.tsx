import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function HeroSection({ searchTerm, setSearchTerm }: HeroSectionProps) {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-20 md:py-32"
      style={{ backgroundImage: "url('https://optimizacontratistas.com/wp-content/uploads/2019/10/Soluci%C3%B3n-de-Controversias-en-el-Sector-de-la-Construcci%C3%B3n-web-1030x480.jpg')" }}
    >
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4 leading-tight">
          Tu Hogar, Nuestro Compromiso
        </h2>
        <p className="text-lg md:text-xl text-pretty mb-8 max-w-3xl mx-auto">
          Encuentra soluciones claras y confiables para construir, reparar y mejorar tu propiedad. Estamos aquí para ayudarte en cada paso.
        </p>

        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="¿Qué problema quieres solucionar hoy?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-6 text-base text-gray-800 rounded-full w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </section>
  );
}
