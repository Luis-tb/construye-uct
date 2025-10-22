import type { FC } from 'react';

interface Category {
    id: string;
    nombre: string;
    icono: FC<{ className?: string }>;
}

interface CategoriesProps {
    categorias: Category[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function Categories({ categorias, selectedCategory, setSelectedCategory }: CategoriesProps) {
    return (
        <section className="py-12 bg-gray-50 border-y">
            <div className="container mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-3">¿Sobre qué quieres aprender hoy?</h3>
                <p className="text-lg text-center text-gray-600 mb-8">Selecciona una categoría para ver los problemas más comunes.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {categorias.map((categoria) => {
                        const IconComponent = categoria.icono;
                        const isSelected = selectedCategory === categoria.id;
                        
                        return (
                            <button
                                key={categoria.id}
                                onClick={() => setSelectedCategory(categoria.id)}
                                className={`
                                    flex items-center justify-center gap-3 px-6 py-3 rounded-full 
                                    font-semibold text-base border-2 transition-transform transform hover:scale-105
                                    ${isSelected 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <IconComponent className="h-5 w-5"/>
                                <span>{categoria.nombre}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
