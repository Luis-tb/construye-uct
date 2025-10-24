import type { FC } from 'react';
import { ListChecks } from 'lucide-react'; // Icono para "Todas las Categorías"

// Tipos de datos (dejados como estaban, pero con un alias para claridad en este archivo)
interface Category {
    id: string;
    nombre: string;
    icono: FC<{ className?: string }>;
    descripcionBreve?: string;
    problemasCount?: number;
}

interface CategoriesProps {
    categorias: Category[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function Categories({ categorias, selectedCategory, setSelectedCategory }: CategoriesProps) {

    // 1. Crear la categoría especial "TODOS" al inicio del array.
    const allCategories: Category[] = [
        {
            id: 'todos',
            nombre: 'Todas las Guías',
            icono: ListChecks, // Usamos el icono importado
            descripcionBreve: 'Explora todos los problemas y soluciones disponibles.',
            problemasCount: categorias.reduce((total, cat) => total + (cat.problemasCount ?? 0), 0)
        },
        ...categorias
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
                    Categorías
                </h3>
                <p className="text-xl text-center text-gray-500 mb-12 max-w-3xl mx-auto">
                    Selecciona una categoría para acceder a problemas comunes y guías de solución.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/* Mapear sobre el array que incluye "TODOS" */}
                    {allCategories.map((categoria) => {
                        const IconComponent = categoria.icono;
                        const isSelected = selectedCategory === categoria.id;

                        // CLASES DINÁMICAS
                        const baseClasses = "cursor-pointer p-6 rounded-2xl border transition-all duration-300 transform shadow-lg flex flex-col items-center text-center h-full";
                        const selectedClasses = "border-blue-600 bg-blue-600 text-white shadow-blue-400/50 scale-[1.02] hover:shadow-xl";
                        const unselectedClasses = "border-gray-200 bg-white text-gray-800 hover:border-blue-400 hover:shadow-xl hover:scale-[1.01]";

                        return (
                            <div
                                key={categoria.id}
                                onClick={() => {
                                    setSelectedCategory(categoria.id);
                                    // Aquí iría la lógica de navegación (e.g., router.push('/problemasComunes'))
                                    console.log(`Navegando a problemas de: ${categoria.nombre}`);
                                }}
                                className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
                            >
                                {/* Contenedor para el icono con un fondo circular */}
                                <div className={`p-3 rounded-full mb-4 transition-colors duration-300 
                                    ${isSelected ? 'bg-white/20' : 'bg-blue-50 border border-blue-100'}
                                `}>
                                    <IconComponent className={`h-8 w-8 transition-colors duration-300 
                                        ${isSelected ? 'text-white' : 'text-blue-600'}
                                    `} />
                                </div>

                                <h4 className="font-extrabold text-lg mb-1">{categoria.nombre}</h4>

                                {/* Descripción */}
                                {categoria.descripcionBreve && (
                                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'} mb-3 flex-grow`}>
                                        {categoria.descripcionBreve}
                                    </p>
                                )}

                                {/* Count de problemas */}
                                <span className={`
                                    px-3 py-1 text-xs rounded-full font-bold mt-auto
                                    ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}
                                `}>
                                    {categoria.problemasCount ?? 0} {categoria.problemasCount === 1 ? 'problema' : 'problemas'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}