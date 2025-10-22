import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// TODO: Mover a un archivo de tipos compartido
interface Guia {
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

interface GuideCardProps {
  guia: Guia;
}

const getDifficultyColor = (dificultad: string) => {
  switch (dificultad) {
    case "Baja":
      return "bg-green-100 text-green-800";
    case "Media":
      return "bg-yellow-100 text-yellow-800";
    case "Alta":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function GuideCard({ guia }: GuideCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className="mb-2">{guia.categoria}</Badge>
            <CardTitle className="text-lg mb-2">{guia.titulo}</CardTitle>
            <CardDescription className="text-base">
              {guia.descripcion}
            </CardDescription>
          </div>
          <Badge className={getDifficultyColor(guia.dificultad)}>
            {guia.dificultad}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Link to={`/guia/${guia.id}`} className="w-full mt-4">
          <Button variant="outline" className="w-full">
            Ver Guía Completa
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
