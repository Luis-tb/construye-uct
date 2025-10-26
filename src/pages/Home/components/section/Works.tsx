import {Badge} from "@/components/ui/badge.tsx";
import {howItWorks} from "@/pages/Home/home.data.ts";
import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card.tsx";

export default function Works() {
    return <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge className="mb-4">Proceso Simple</Badge>
                <h2 className="mb-3 text-gray-900">Cómo funciona</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    En solo 3 pasos simples puedes resolver cualquier problema de tu hogar
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {howItWorks.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: index * 0.2}}
                            className="relative"
                        >
                            {index < howItWorks.length - 1 && (
                                <div
                                    className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -translate-x-1/2 z-0"></div>
                            )}
                            <Card className="relative z-10 text-center hover:shadow-lg transition-shadow h-full">
                                <CardContent className="p-6">
                                    <div
                                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Icon className="w-10 h-10 text-white"/>
                                    </div>
                                    <div
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
                                        {step.step}
                                    </div>
                                    <h3 className="text-gray-900 mb-2 mt-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
}