import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/routes.ts";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <img src="/logo-large.svg" alt="Logo" className="h-16 w-auto mb-3"/>
                        <p className="text-gray-600">
                            Conectamos profesionales expertos con propietarios que necesitan soluciones confiables.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-gray-900 mb-3">Servicios</h5>
                        <ul className="space-y-2 text-gray-600">
                            <li className="cursor-pointer hover:text-blue-600"
                                onClick={() => navigate(ROUTES.PROBLEMS_SOLUTIONS)}>
                                Problemas Comunes
                            </li>
                            <li className="cursor-pointer hover:text-blue-600"
                                onClick={() => navigate(ROUTES.PROFESSIONALS)}>
                                Solicitar Profesional
                            </li>
                            <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate(ROUTES.TIPS)}>
                                Consejos
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-gray-900 mb-3">Ayuda</h5>
                        <ul className="space-y-2 text-gray-600">
                            <li className="cursor-pointer hover:text-blue-600">
                                Preguntas frecuentes
                            </li>
                            <li className="cursor-pointer hover:text-blue-600">
                                Términos y condiciones
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; 2025 MaestroEnCasa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
