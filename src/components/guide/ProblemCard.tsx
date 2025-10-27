import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Shield } from "lucide-react";

// 👉 Idealmente mover este tipo a src/types/problem.ts
export interface Problema {
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

interface ProblemCardProps {
    problema: Problema;
    isOpen: boolean;
    onToggle: (isOpen: boolean) => void;
}

const getDifficultyColor = (dificultad: string): string => {
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

export function ProblemCard({ problema, isOpen, onToggle }: ProblemCardProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl">
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-2">
                            {problema.titulo}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600">
                            {problema.descripcion}
                        </CardDescription>
                    </div>
                    <Badge className={`${getDifficultyColor(problema.dificultad)} px-3 py-1`}>
                        {problema.dificultad}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    value={isOpen ? "solucion" : ""}
                    onValueChange={(value) => onToggle(value === "solucion")}
                >
                    <AccordionItem value="solucion">
                        <AccordionTrigger className="text-left font-medium text-gray-800">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Ver Solución</span>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="mt-3 space-y-4">
                            <section>
                                <h4 className="font-semibold text-green-700 mb-2">
                                    Solución:
                                </h4>
                                <p className="text-sm leading-relaxed text-gray-700">
                                    {problema.solucion}
                                </p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <h5 className="font-semibold text-blue-700">
                                        Costo Estimado
                                    </h5>
                                    <p className="text-blue-600">{problema.costo}</p>
                                </div>

                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <h5 className="font-semibold text-purple-700">Tiempo</h5>
                                    <p className="text-purple-600">{problema.tiempo}</p>
                                </div>

                                <div className="bg-orange-50 p-3 rounded-lg">
                                    <h5 className="font-semibold text-orange-700">
                                        Dificultad
                                    </h5>
                                    <p className="text-orange-600">{problema.dificultad}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 mb-2 flex items-center">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Prevención
                                </h5>
                                <p className="text-sm text-green-700 leading-relaxed">
                                    {problema.prevencion}
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
