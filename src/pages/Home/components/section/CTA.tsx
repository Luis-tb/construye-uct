import {motion} from "framer-motion"
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, Shield, Target, TrendingUp} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/routes.ts";

/* Final CTA */
const CTA = () => {
    const onNavigate = useNavigate()
    return <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
                className="max-w-3xl mx-auto"
            >
                <h2 className="mb-4 text-white">
                    ¿Listo para solucionar tu problema?
                </h2>
                <p className="text-blue-100 mb-8 text-lg">
                    Únete a miles de usuarios que ya confían en nosotros para mantener sus
                    hogares en perfecto estado
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-50"
                        onClick={() => onNavigate(ROUTES.PROFESSIONALS)}
                    >
                        Solicitar Profesional Ahora
                        <ArrowRight className="w-4 h-4 ml-2"/>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white hover:bg-white/40 hover:text-white"
                        onClick={() => onNavigate(ROUTES.TIPS)}
                    >
                        Explorar Tutoriales Gratuitos
                    </Button>
                </div>
                <div className="flex items-center justify-center gap-8 mt-8 text-blue-100">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5"/>
                        <span>Sin compromiso</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5"/>
                        <span>Respuesta rápida</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5"/>
                        <span>100% seguro</span>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
}

export default CTA;