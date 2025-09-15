import { Hammer } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Hammer className="h-6 w-6 text-green-800" />
            <span className="font-semibold">Guía de Construcción Perú</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Información basada en estándares y datos de SENCICO
          </p>
          <p className="text-xs text-muted-foreground">
            Esta guía es informativa. Para problemas complejos, consulta
            siempre con un profesional certificado.
          </p>
        </div>
      </div>
    </footer>
  );
}
