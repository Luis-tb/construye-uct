import {useState} from "react";
import {
    AlertTriangle,
    ArrowUp,
    Droplet,
    Filter,
    Hammer,
    Home,
    Layers,
    Search,
    Triangle,
    Wind,
    Wrench,
    Zap
} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ImageWithFallback} from "@/components/ImageWithFallback.tsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/routes.ts";

interface Problem {
    id: string;
    title: string;
    cause: string;
    image: string;
    icon: any;
    category: string;
    severity: "low" | "medium" | "high";
}

interface Category {
    id: string;
    name: string;
    icon: any;
    color: string;
    description: string;
}

export default function CommonProblemsPage() {
    const onNavigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories: Category[] = [
        {
            id: "all",
            name: "Todos",
            icon: Filter,
            color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
            description: "Ver todos los problemas",
        },
        {
            id: "cimientos",
            name: "Cimientos",
            icon: Layers,
            color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
            description: "Problemas en la base de tu hogar",
        },
        {
            id: "paredes",
            name: "Paredes",
            icon: Home,
            color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
            description: "Daños y deterioro en muros",
        },
        {
            id: "techos",
            name: "Techos",
            icon: Triangle,
            color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
            description: "Filtraciones y problemas de techo",
        },
        {
            id: "electricidad",
            name: "Electricidad",
            icon: Zap,
            color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
            description: "Instalaciones y fallas eléctricas",
        },
        {
            id: "plomeria",
            name: "Plomería",
            icon: Droplet,
            color: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
            description: "Tuberías y sistemas de agua",
        },
    ];

    const problems: Problem[] = [
        // CIMIENTOS
        {
            id: "foundation-cracks",
            title: "Grietas en cimientos",
            cause: "Asentamiento del terreno o falta de refuerzo",
            image: "https://images.unsplash.com/photo-1641605272318-5cf11f8de2c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VuZGF0aW9uJTIwY29uY3JldGUlMjBjcmFja3N8ZW58MXx8fHwxNzYxMjc1NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: AlertTriangle,
            category: "cimientos",
            severity: "high",
        },
        {
            id: "foundation-settlement",
            title: "Hundimiento de cimientos",
            cause: "Suelo inestable o construcción inadecuada",
            image: "https://images.unsplash.com/photo-1641605272318-5cf11f8de2c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VuZGF0aW9uJTIwY29uY3JldGUlMjBjcmFja3N8ZW58MXx8fHwxNzYxMjc1NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: ArrowUp,
            category: "cimientos",
            severity: "high",
        },
        {
            id: "foundation-moisture",
            title: "Humedad en cimientos",
            cause: "Falta de impermeabilización o drenaje deficiente",
            image: "https://images.unsplash.com/photo-1561370051-f4a3b18e8a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGxlYWslMjBodW1pZGl0eXxlbnwxfHx8fDE3NjExMDQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Droplet,
            category: "cimientos",
            severity: "high",
        },

        // PAREDES
        {
            id: "wall-cracks",
            title: "Grietas en paredes",
            cause: "Asentamiento de cimientos o cambios de temperatura",
            image: "https://images.unsplash.com/photo-1740921303129-126a783b9c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwY3JhY2slMjBkYW1hZ2V8ZW58MXx8fHwxNzYxMTA0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Home,
            category: "paredes",
            severity: "medium",
        },
        {
            id: "wall-humidity",
            title: "Humedad en paredes",
            cause: "Filtraciones de agua o condensación",
            image: "https://images.unsplash.com/photo-1561370051-f4a3b18e8a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGxlYWslMjBodW1pZGl0eXxlbnwxfHx8fDE3NjExMDQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Droplet,
            category: "paredes",
            severity: "medium",
        },
        {
            id: "wall-mold",
            title: "Moho en paredes",
            cause: "Exceso de humedad y poca ventilación",
            image: "https://images.unsplash.com/photo-1561370051-f4a3b18e8a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGxlYWslMjBodW1pZGl0eXxlbnwxfHx8fDE3NjExMDQyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Wind,
            category: "paredes",
            severity: "medium",
        },
        {
            id: "wall-paint-peeling",
            title: "Pintura desprendida",
            cause: "Humedad, mala preparación o pintura de baja calidad",
            image: "https://images.unsplash.com/photo-1740921303129-126a783b9c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwY3JhY2slMjBkYW1hZ2V8ZW58MXx8fHwxNzYxMTA0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Home,
            category: "paredes",
            severity: "low",
        },

        // TECHOS
        {
            id: "roof-leaks",
            title: "Goteras en techo",
            cause: "Impermeabilización dañada o tejas rotas",
            image: "https://images.unsplash.com/photo-1702047816443-a115804039bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwbGVhayUyMGRhbWFnZXxlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Triangle,
            category: "techos",
            severity: "high",
        },
        {
            id: "ceiling-stains",
            title: "Manchas en techo",
            cause: "Filtraciones de agua del piso superior o techo",
            image: "https://images.unsplash.com/photo-1644329615817-036a646f9348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwd2F0ZXIlMjBzdGFpbnxlbnwxfHx8fDE3NjEyNzU0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Droplet,
            category: "techos",
            severity: "medium",
        },
        {
            id: "roof-structure",
            title: "Daños estructurales en techo",
            cause: "Vigas dañadas o sobrecarga de peso",
            image: "https://images.unsplash.com/photo-1702047816443-a115804039bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwbGVhayUyMGRhbWFnZXxlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Hammer,
            category: "techos",
            severity: "high",
        },

        // ELECTRICIDAD
        {
            id: "electrical-failures",
            title: "Fallas eléctricas constantes",
            cause: "Instalación antigua o sobrecarga de circuitos",
            image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Zap,
            category: "electricidad",
            severity: "high",
        },
        {
            id: "electrical-sparks",
            title: "Chispas en contactos",
            cause: "Conexiones flojas o cables deteriorados",
            image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Zap,
            category: "electricidad",
            severity: "high",
        },
        {
            id: "electrical-overload",
            title: "Sobrecarga eléctrica",
            cause: "Demasiados aparatos en un mismo circuito",
            image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NjExMDQyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: AlertTriangle,
            category: "electricidad",
            severity: "medium",
        },

        // PLOMERÍA
        {
            id: "plumbing-leaks",
            title: "Fugas de agua en tuberías",
            cause: "Tuberías oxidadas o conexiones dañadas",
            image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Droplet,
            category: "plomeria",
            severity: "high",
        },
        {
            id: "plumbing-clog",
            title: "Tuberías obstruidas",
            cause: "Acumulación de residuos o objetos extraños",
            image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Wrench,
            category: "plomeria",
            severity: "medium",
        },
        {
            id: "plumbing-pressure",
            title: "Baja presión de agua",
            cause: "Tuberías obstruidas o válvulas cerradas parcialmente",
            image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Droplet,
            category: "plomeria",
            severity: "low",
        },
        {
            id: "plumbing-drain",
            title: "Drenaje lento",
            cause: "Tuberías sucias o con pendiente inadecuada",
            image: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBpcGUlMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjEyNzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            icon: Wrench,
            category: "plomeria",
            severity: "low",
        },
    ];

    // Filter problems by category and search term
    const filteredProblems = problems.filter((problem) => {
        const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
        const matchesSearch =
            problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.cause.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Count problems per category
    const getCategoryCount = (categoryId: string) => {
        if (categoryId === "all") return problems.length;
        return problems.filter((p) => p.category === categoryId).length;
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-100 text-red-700";
            case "medium":
                return "bg-yellow-100 text-yellow-700";
            case "low":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getSeverityLabel = (severity: string) => {
        switch (severity) {
            case "high":
                return "Alta prioridad";
            case "medium":
                return "Media prioridad";
            case "low":
                return "Baja prioridad";
            default:
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h1 className="mb-3 text-gray-900">Problemas Comunes</h1>
                    <p className="text-gray-600 mb-8">
                        Identifica y soluciona los problemas más frecuentes en tu hogar
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <Input
                            type="text"
                            placeholder="¿Qué problema tienes en casa?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 py-6"
                        />
                    </div>
                </div>

                {/* Category Filter Cards */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-gray-900">Categorías</h2>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {filteredProblems.length} problemas encontrados
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = selectedCategory === category.id;
                            const count = getCategoryCount(category.id);

                            return (
                                <Card
                                    key={category.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${
                                        isActive ? "ring-2 ring-blue-500 shadow-md" : ""
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <CardContent className="p-4 text-center">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                                                isActive ? "bg-blue-600 text-white" : category.color
                                            }`}
                                        >
                                            <Icon className="w-6 h-6"/>
                                        </div>
                                        <p className={`text-gray-900 mb-1 ${isActive ? "" : ""}`}>
                                            {category.name}
                                        </p>
                                        <Badge variant="secondary" className="text-xs">
                                            {count}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Active Filter Info */}
                {selectedCategory !== "all" && (
                    <div className="mb-6">
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const category = categories.find((c) => c.id === selectedCategory);
                                        const Icon = category?.icon;
                                        return (
                                            <>
                                                {Icon && (
                                                    <div
                                                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <Icon className="w-5 h-5 text-white"/>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-blue-900">
                                                        Mostrando problemas de: {category?.name}
                                                    </p>
                                                    <p className="text-blue-700">{category?.description}</p>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedCategory("all")}
                                    className="text-blue-700 hover:text-blue-900"
                                >
                                    Ver todos
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Problems Grid */}
                {filteredProblems.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProblems.map((problem) => {
                            const Icon = problem.icon;
                            return (
                                <Card
                                    key={problem.id}
                                    className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                                    onClick={() => onNavigate(ROUTES.PROBLEMS_SOLUTIONS + "/" + problem.id)}
                                >
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        <ImageWithFallback
                                            src={problem.image}
                                            alt={problem.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div
                                            className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                            <Icon className="w-6 h-6 text-blue-600"/>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Badge className={getSeverityColor(problem.severity)}>
                                                {getSeverityLabel(problem.severity)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="mb-2 text-gray-900">{problem.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{problem.cause}</p>
                                        <Button className="w-full group-hover:bg-blue-700 transition-colors">
                                            Ver solución
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div
                            className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400"/>
                        </div>
                        <p className="text-gray-500 mb-2">No se encontraron problemas</p>
                        <p className="text-gray-400 mb-6">
                            Intenta con otra categoría o término de búsqueda
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedCategory("all");
                                setSearchTerm("");
                            }}
                        >
                            Limpiar filtros
                        </Button>
                    </div>
                )}

                {/* Help CTA */}
                {filteredProblems.length > 0 && (
                    <Card className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <CardContent className="p-8 text-center">
                            <h3 className="mb-3 text-white">¿No encuentras tu problema?</h3>
                            <p className="mb-6 text-blue-100">
                                Conecta con un profesional certificado para recibir ayuda personalizada
                            </p>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => onNavigate(ROUTES.PROFESSIONALS)}
                            >
                                Solicitar Profesional
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}