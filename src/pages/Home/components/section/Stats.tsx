import {stats} from "@/pages/Home/home.data.ts";
import {motion} from "framer-motion";

export default function Stats() {
    return <section className="py-12 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                        className="text-center"
                    >
                        <div
                            className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                            <stat.icon className="w-6 h-6 text-blue-600"/>
                        </div>
                        <h3 className="text-gray-900 mb-1">{stat.number}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
}