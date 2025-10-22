import { useParams, Link } from "react-router-dom";
import { problemas, categorias } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CheckCircle, CircleDollarSign, Clock, BarChart, AlertTriangle } from "lucide-react";
import { getDifficultyBadgeClasses } from "@/lib/utils";
import type { Problema } from "@/types";

/**
 * Muestra la página de detalle para un problema de construcción específico.
 * Extrae el ID del problema de los parámetros de la URL para encontrar y mostrar
 * la información completa, incluyendo solución, costos, tiempo y prevención.
 */
export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const problema = problemas.find((p) => p.id.toString() === id) as Problema | undefined;

  if (!problema) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Problema no encontrado</h2>
            <p className="text-lg text-gray-600 mb-8">No pudimos encontrar la página que buscas.</p>
            <Link to="/">
                <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition">
                    Volver al Inicio
                </button>
            </Link>
        </div>
      </div>
    );
  }

  const categoriaActual = categorias.find(cat => cat.id === problema.categoria);
  const Icono = categoriaActual ? categoriaActual.icono : Shield;

  return (
    <div className="bg-gray-50 py-16 md:py-20">
        <main className="max-w-4xl mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-base text-gray-600 hover:text-blue-600 font-semibold mb-6 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver a Problemas y Soluciones
            </Link>

            <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <CardHeader className="p-8 border-b">
                    <div className="flex items-start gap-5">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Icono className="h-7 w-7 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-3xl font-bold mb-2">{problema.titulo}</CardTitle>
                            <p className="text-lg text-gray-600">{problema.descripcion}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                            <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                            Solución Paso a Paso
                        </h3>
                        <p className="text-base leading-relaxed text-gray-700 whitespace-pre-line">{problema.solucion}</p>
                    </div>

                    <div className="space-y-4 text-base">
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
                            <CircleDollarSign className="h-6 w-6 text-gray-500"/>
                            <span className="font-semibold text-gray-800">Costo Estimado:</span>
                            <span className="text-gray-600">{problema.costo}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
                            <Clock className="h-6 w-6 text-gray-500"/>
                            <span className="font-semibold text-gray-800">Tiempo Requerido:</span>
                            <span className="text-gray-600">{problema.tiempo}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
                            <BarChart className="h-6 w-6 text-gray-500"/>
                            <span className="font-semibold text-gray-800">Dificultad:</span>
                            <Badge className={getDifficultyBadgeClasses(problema.dificultad)}>{problema.dificultad}</Badge>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                            <Shield className="h-6 w-6 mr-3" />
                            Consejo de Prevención
                        </h3>
                        <p className="text-base text-green-700 leading-relaxed">
                            {problema.prevencion}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
