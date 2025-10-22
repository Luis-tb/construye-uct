import { useParams, Link } from "react-router-dom";
import { problemas as guias } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

const getDifficultyColor = (dificultad: string) => {
  switch (dificultad) {
    case "Baja": return "bg-green-100 text-green-800";
    case "Media": return "bg-yellow-100 text-yellow-800";
    case "Alta": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function GuideDetail() {
  const { id } = useParams<{ id: string }>();
  const guia = guias.find((g) => g.id.toString() === id);

  if (!guia) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Guía no encontrada</h2>
        <p className="text-muted-foreground mb-6">No pudimos encontrar la guía que buscas.</p>
        <Link to="/guias">
          <button className="px-6 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition">
            Volver a todas las guías
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/guias" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a todas las guías
        </Link>

      <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                    <Badge className="mb-2">{guia.categoria}</Badge>
                    <CardTitle className="text-3xl font-bold mb-2">{guia.titulo}</CardTitle>
                </div>
                <Badge className={`mt-2 md:mt-0 ${getDifficultyColor(guia.dificultad)}`}>
                    Dificultad: {guia.dificultad}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Solución Paso a Paso
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{guia.solucion}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Costo Estimado</h4>
                    <p className="text-blue-700 text-lg">{guia.costo}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Tiempo Requerido</h4>
                    <p className="text-purple-700 text-lg">{guia.tiempo}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800">Dificultad</h4>
                    <p className="text-orange-700 text-lg">{guia.dificultad}</p>
                  </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-yellow-600" />
                    Consejos de Prevención
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{guia.prevencion}</p>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
