import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {faqs} from "@/pages/Home/home.data.ts";
import {motion} from "framer-motion";

export default function FAQ() {
    return <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge className="mb-4">Preguntas Frecuentes</Badge>
                <h2 className="mb-3 text-gray-900">¿Tienes dudas?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Aquí respondemos las preguntas más comunes
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 10}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.3, delay: index * 0.05}}
                        >
                            <AccordionItem
                                value={`item-${index}`}
                                className="bg-white border rounded-lg px-6"
                            >
                                <AccordionTrigger className="hover:no-underline">
                                    <span className="text-gray-900 text-left">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </div>
    </section>
}