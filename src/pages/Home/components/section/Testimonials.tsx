import {Badge} from "@/components/ui/badge.tsx";
import {Quote, Star} from "lucide-react";
import {testimonials} from "@/pages/Home/home.data.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {motion} from "framer-motion";
import {ImageWithFallback} from "@/components/ImageWithFallback.tsx";

export default function Testimonials() {
    return <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge className="mb-4">Testimonios</Badge>
                <h2 className="mb-3 text-gray-900">Lo que dicen nuestros usuarios</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Miles de personas han resuelto sus problemas del hogar con nosotros
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                    >
                        <Card className="h-full hover:shadow-xl transition-shadow">
                            <CardContent className="p-6">
                                <Quote className="w-10 h-10 text-blue-200 mb-4"/>
                                <div className="flex mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full overflow-hidden">
                                        <ImageWithFallback
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-gray-900">{testimonial.name}</p>
                                        <p className="text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
}