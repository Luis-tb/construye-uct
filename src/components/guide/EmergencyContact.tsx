import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Users } from "lucide-react";

export default function EmergencyContact() {
  return (
    <section className="bg-red-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              ¿Emergencia en tu Construcción?
            </CardTitle>
            <CardDescription>
              Si tienes un problema urgente que pone en riesgo la seguridad,
              contacta inmediatamente a un profesional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Llamar Emergencia</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
              >
                <Users className="h-4 w-4" />
                <span>Encontrar Profesional</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
