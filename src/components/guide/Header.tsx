import {Hammer, MapPin} from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 text-white shadow-lg bg-[#022867]">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Hammer className="h-8 w-8"/>
                        <div>
                            <h1 className="text-xl font-bold">Guía de Construcción</h1>
                            <p className="text-sm opacity-90">Basado en datos de SENCICO</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4"/>
                        <span className="text-sm">Perú</span>
                    </div>
                </div>
            </div>
        </header>
    )
}