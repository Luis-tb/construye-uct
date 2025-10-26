import {Badge} from "@/components/ui/badge.tsx";
import {professionals} from "@/pages/Home/home.data.ts";
import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {ArrowRight, CheckCircle2, Star, ThumbsUp, Users} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/routes.ts";

export default function Professionals() {
    const onNavigate = useNavigate()
    return <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge className="mb-4">Profesionales Destacados</Badge>
                <h2 className="mb-3 text-gray-900">Expertos certificados listos para ayudarte</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Todos nuestros profesionales están verificados y tienen excelentes calificaciones
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                {professionals.map((pro, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 text-center">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <Users className="w-10 h-10 text-gray-600"/>
                                </div>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <h4 className="text-gray-900">{pro.name}</h4>
                                    {pro.verified && (
                                        <Badge className="bg-blue-600 ">
                                            <CheckCircle2 className="w-3 h-3"/>
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-3">{pro.specialty}</p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                                        <span className="text-gray-700">{pro.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4 text-gray-400"/>
                                        <span className="text-gray-700">{pro.jobs} trabajos</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="text-center">
                <Button size="lg" onClick={() => onNavigate(ROUTES.PROFESSIONALS)}>
                    Conectar con profesionales
                    <ArrowRight className="w-4 h-4 ml-2"/>
                </Button>
            </div>
        </div>
    </section>
}