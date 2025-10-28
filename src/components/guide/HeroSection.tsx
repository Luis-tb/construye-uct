import {ArrowRight, Award, CheckCircle2, Shield, Users} from "lucide-react";
import {motion} from "framer-motion";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ImageWithFallback} from "@/components/ImageWithFallback.tsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/routes.ts";

export default function HeroSection() {
    const onNavigate = useNavigate()
    return (
        <section
            className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                    >
                        <Badge className="bg-blue-500 text-white mb-4 border-blue-400">
                            <Award className="w-3 h-3 mr-1"/>
                            Plataforma #1 en Perú
                        </Badge>
                        <h1 className="mb-6 text-white">
                            Soluciona problemas de tu casa con expertos certificados
                        </h1>
                        <p className="text-blue-100 mb-8 text-lg">
                            Conecta con más de 5,000 profesionales verificados o aprende a resolver
                            problemas comunes con nuestros tutoriales paso a paso. Rápido, seguro y
                            confiable.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50"
                                onClick={() => onNavigate(ROUTES.PROFESSIONALS)}
                            >
                                Solicitar Profesional
                                <ArrowRight className="w-4 h-4 ml-2"/>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white hover:bg-white/40 hover:text-white"
                                onClick={() => onNavigate(ROUTES.PROBLEMS_SOLUTIONS)}
                            >
                                Ver Problemas Comunes
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 text-blue-100">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-400"/>
                                <span>Respuesta en minutos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-400"/>
                                <span>100% Verificados</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Image */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1742112125567-3e8967bad60f?ixlib=rb-4.1.0&w=1080&fm=webp&q=85"
                                alt="Casa moderna"
                                className="w-full h-auto"
                            />
                            {/* Floating Cards */}
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.6, delay: 0.8}}
                                className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600"/>
                                    </div>
                                    <div>
                                        <p className="text-gray-900">Problema resuelto</p>
                                        <p className="text-gray-500">Hace 5 minutos</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.6, delay: 1}}
                                className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 bg-blue-100 border-2 border-white rounded-full flex items-center justify-center"
                                            >
                                                <Users className="w-4 h-4 text-blue-600"/>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-gray-900">+5 cotizaciones</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
