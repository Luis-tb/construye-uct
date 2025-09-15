import {Button} from "@/components/ui/button";
import type {FC} from 'react';

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

export default function Categories({categorias, selectedCategory, setSelectedCategory}: CategoriesProps) {
    return (
        <section className="py-8 border-b">
            <div className="container mx-auto px-4">
                <h3 className="text-xl font-semibold mb-4">Categorías</h3>
                <div className="flex flex-wrap gap-2">
                    {categorias.map((categoria) => {
                        const IconComponent = categoria.icono;
                        return (
                            <Button
                                key={categoria.id}
                                variant={
                                    selectedCategory === categoria.id ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(categoria.id)}
                                className="flex items-center space-x-2"
                            >
                                <IconComponent className="h-4 w-4"/>
                                <span>{categoria.nombre}</span>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}