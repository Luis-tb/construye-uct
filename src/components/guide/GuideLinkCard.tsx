import {Link} from "react-router-dom";
import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

interface GuideLink {
    id: number;
    titulo: string;
    descripcion: string;
    url: string;
    icono: FC<{ className?: string }>;
}

interface GuideLinkCardProps {
    guia: GuideLink;
}

export default function GuideLinkCard({guia}: GuideLinkCardProps) {
    const Icono = guia.icono;

    return (
        <Card
            className="bg-white hover:shadow-xl transition-shadow duration-300 border rounded-2xl overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4 p-5">
                <div className="bg-blue-100 p-4 rounded-xl">
                    <Icono className="h-8 w-8 text-blue-600"/>
                </div>
                <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-2 leading-tight">{guia.titulo}</CardTitle>
                    <CardDescription className="text-base text-gray-600">
                        {guia.descripcion}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex-grow flex flex-col justify-end">
                <Link to={guia.url} className="w-full mt-2">
                    <Button size="lg" className="w-full text-base font-semibold py-5">
                        Ir a la Guía
                        <ArrowRight className="h-5 w-5 ml-2"/>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
