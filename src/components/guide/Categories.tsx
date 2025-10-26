import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { Categoria } from '@/types';

interface CategoriesProps {
    categorias: Categoria[];
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
}

const Categories: FC<CategoriesProps> = ({ categorias, selectedCategory, setSelectedCategory }) => {

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explora por Categoría</h2>
                    <p className="mt-3 text-lg text-gray-600">Encuentra soluciones a problemas específicos.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {/* Botón para mostrar todas las categorías */}
                    <motion.button
                        onClick={() => setSelectedCategory('todos')}
                        className={`relative p-4 rounded-xl text-center transition-all duration-300 ${
                            selectedCategory === 'todos' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 shadow-md hover:shadow-xl hover:-translate-y-1'
                        }`}
                        whileHover={{ scale: selectedCategory === 'todos' ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="font-bold">Ver Todos</h3>
                    </motion.button>

                    {/* Mapeo de categorías */}
                    {categorias.map((cat) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`relative p-4 rounded-xl text-center transition-all duration-300 ${
                                selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-700 shadow-md hover:shadow-xl hover:-translate-y-1'
                            }`}
                            whileHover={{ scale: selectedCategory === cat.id ? 1.05 : 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <cat.icono className="h-8 w-8 mx-auto mb-3 text-blue-500" style={{ color: selectedCategory === cat.id ? 'white' : '' }} />
                            <h3 className="font-semibold text-sm">{cat.nombre}</h3>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;