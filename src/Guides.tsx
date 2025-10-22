import GuideLinkCard from "@/components/guide/GuideLinkCard";
import {Bath, Layers, PaintRoller, Zap} from 'lucide-react';

// Datos para las guías principales con iconos
const guiasPrincipales = [
    {
        id: 1,
        titulo: "Guía Completa de Cimentaciones",
        descripcion: "Aprende todo sobre cimientos, desde la excavación hasta el vaciado de concreto. Ideal para construcciones seguras.",
        url: "/guias/cimentaciones", // URL de ejemplo
        icono: Layers,
    },
    {
        id: 2,
        titulo: "Instalaciones Sanitarias Paso a Paso",
        descripcion: "Una guía detallada para planificar e instalar correctamente las tuberías de agua y desagüe en tu hogar.",
        url: "/guias/sanitarias",
        icono: Bath,
    },
    {
        id: 3,
        titulo: "Manual de Instalaciones Eléctricas",
        descripcion: "Conceptos básicos y procedimientos para realizar una instalación eléctrica residencial de forma segura y eficiente.",
        url: "/guias/electricas",
        icono: Zap,
    },
    {
        id: 4,
        titulo: "Todo sobre Acabados: Tarrajeo y Pintura",
        descripcion: "Descubre las técnicas y materiales para lograr acabados de calidad en muros y techos.",
        url: "/guias/acabados",
        icono: PaintRoller,
    }
];

export default function Guides() {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Guías de Construcción</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Recursos completos y fáciles
                        de
                        entender para que puedas tomar las mejores decisiones en tu proyecto.</p>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {guiasPrincipales.map(guia => (
                        <GuideLinkCard key={guia.id} guia={guia}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
