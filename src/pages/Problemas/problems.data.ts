import * as React from "react";
import {AlertTriangle, ArrowUp, Droplet, Filter, Hammer, Home, Layers, Triangle, Wind, Wrench, Zap} from "lucide-react";

export interface Problem {
    id: string;
    title: string;
    cause: string;
    image: string;
    icon: React.ElementType;
    category: string;
    severity: "low" | "medium" | "high";
}

export interface Category {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    description: string;
}

export interface ProblemDetailData {
    title: string;
    commonCause: string;
    whyItHappens: string;
    solutions: string[];
}

export const categories: Category[] = [
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

export const problems: Problem[] = [
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

export const problemDetails: Record<string, ProblemDetailData> = {
    "wall-cracks": {
        title: "Grietas en paredes",
        commonCause: "Asentamiento de cimientos, cambios bruscos de temperatura o humedad excesiva en los materiales de construcción.",
        whyItHappens: "Las grietas pueden aparecer por diversos factores: movimientos naturales del terreno, mala calidad de materiales, errores en la construcción, o simplemente el paso del tiempo. Las grietas horizontales o en diagonal suelen ser más graves que las verticales.",
        solutions: [
            "Evaluar la profundidad y dirección de la grieta con un profesional",
            "Verificar si la grieta está activa (sigue creciendo) o es estable",
            "Reparar grietas superficiales con sellador elástico",
            "Para grietas estructurales, reforzar con malla y mortero especial",
            "Controlar la humedad y el drenaje alrededor de los cimientos"
        ]
    },
    "foundation-cracks": {
        title: "Grietas en cimientos",
        commonCause: "Asentamiento del terreno, mala compactación del suelo o falta de refuerzo adecuado en el concreto.",
        whyItHappens: "Los cimientos son la base de todo. Si el suelo sobre el que se asientan no es estable o si el diseño de la cimentación fue deficiente, se producirán tensiones que resultan en grietas. Estas son de las más peligrosas para la estructura.",
        solutions: [
            "Contactar a un ingeniero estructural para una evaluación inmediata",
            "Realizar un estudio de suelos para determinar la causa del asentamiento",
            "Inyección de resinas epóxicas para sellar y reforzar grietas",
            "Refuerzo de la cimentación con micropilotes o recalce",
            "Mejorar el sistema de drenaje perimetral para evitar la erosión del suelo"
        ]
    },
    "wall-humidity": {
        title: "Humedad y filtraciones",
        commonCause: "Impermeabilización deficiente, tuberías dañadas, o condensación por falta de ventilación.",
        whyItHappens: "La humedad puede provenir de múltiples fuentes: lluvia que penetra por fisuras, agua que sube desde el suelo (capilaridad), fugas en tuberías ocultas, o simplemente vapor de agua que se condensa en paredes frías.",
        solutions: [
            "Identificar la fuente exacta de la humedad (filtración, capilaridad o condensación)",
            "Reparar goteras en techos y sellar fisuras en paredes exteriores",
            "Aplicar sistemas de impermeabilización en azoteas y muros",
            "Revisar y reparar la red de plomería",
            "Mejorar la ventilación de baños y cocinas con extractores",
            "Instalar barreras de vapor o tratamientos anti-humedad por capilaridad"
        ]
    },
    "electrical-failures": {
        title: "Problemas eléctricos",
        commonCause: "Instalación eléctrica antigua, sobrecarga de circuitos, o cables deteriorados.",
        whyItHappens: "Los problemas eléctricos pueden deberse a instalaciones que no cumplen con normativas actuales, uso de cables de calibre inadecuado, conexiones mal hechas, o simplemente el desgaste del tiempo. También puede haber sobrecarga por conectar demasiados aparatos.",
        solutions: [
            "Revisar la instalación con un electricista certificado",
            "Actualizar el tablero eléctrico si es muy antiguo, incluyendo interruptores termomagnéticos",
            "Distribuir la carga eléctrica en varios circuitos independientes",
            "Reemplazar cables deteriorados o de calibre insuficiente",
            "Instalar protecciones como interruptores diferenciales para prevenir descargas",
            "No sobrecargar enchufes con múltiples extensiones o adaptadores"
        ]
    },
    "foundation-moisture": {
        title: "Humedad en cimientos",
        commonCause: "Falta de una barrera impermeabilizante, drenaje perimetral deficiente o pendiente del terreno hacia la casa.",
        whyItHappens: "El agua del suelo se filtra a través del concreto poroso de los cimientos si no hay una capa protectora. Esto puede causar deterioro del material, aparición de moho en sótanos y debilitamiento estructural a largo plazo.",
        solutions: [
            "Excavar alrededor de los cimientos para aplicar un sistema de impermeabilización exterior.",
            "Instalar o reparar un sistema de drenaje francés alrededor del perímetro de la casa.",
            "Asegurarse de que el terreno tenga una pendiente que aleje el agua de la estructura.",
            "Sellar grietas en los cimientos con materiales epóxicos o de poliuretano."
        ]
    },
    "wall-mold": {
        title: "Moho en paredes",
        commonCause: "Exceso de humedad constante, poca ventilación y oscuridad.",
        whyItHappens: "El moho es un hongo que prospera en ambientes húmedos. Aparece por filtraciones de agua, alta condensación (en baños o cocinas) o problemas de capilaridad desde el suelo. Es un riesgo para la salud y un indicador de un problema de humedad subyacente.",
        solutions: [
            "Identificar y eliminar la fuente de humedad que permite el crecimiento del moho.",
            "Limpiar la superficie afectada con una solución de agua y lejía (10:1) o productos antimoho específicos.",
            "Mejorar la ventilación en la zona, instalando extractores o abriendo ventanas regularmente.",
            "Utilizar pintura antimoho después de limpiar y secar completamente la pared."
        ]
    },
    "wall-paint-peeling": {
        title: "Pintura desprendida",
        commonCause: "Aplicación sobre una superficie sucia, húmeda o mal preparada; uso de pintura de baja calidad.",
        whyItHappens: "La pintura necesita una superficie limpia, seca y porosa para adherirse correctamente. Si se pinta sobre polvo, grasa o una capa de pintura vieja y brillante sin lijar, la nueva capa no se pegará y terminará descascarándose o formando burbujas.",
        solutions: [
            "Raspar y lijar toda la pintura suelta hasta llegar a una capa firme.",
            "Limpiar la pared con agua y jabón para eliminar polvo y grasa, y dejar secar completamente.",
            "Aplicar una capa de imprimación o sellador, especialmente si hay manchas o la pared es muy porosa.",
            "Utilizar pintura de buena calidad y aplicarla en capas finas y uniformes."
        ]
    },
    "roof-leaks": {
        title: "Goteras en techo",
        commonCause: "Tejas rotas o desplazadas, impermeabilización vencida o dañada, o sellado defectuoso alrededor de chimeneas y ventilaciones.",
        whyItHappens: "Con el tiempo, la exposición al sol, la lluvia y el viento degrada los materiales del techo. Una pequeña fisura en el impermeabilizante o una teja movida es suficiente para que el agua se filtre, causando daños en el interior de la vivienda.",
        solutions: [
            "Realizar una inspección visual del techo para localizar tejas rotas o áreas dañadas.",
            "Reemplazar las tejas dañadas inmediatamente.",
            "Aplicar sellador de poliuretano en las juntas y alrededor de elementos salientes.",
            "Si el sistema de impermeabilización es antiguo, considerar una reaplicación completa por un profesional."
        ]
    },
    "ceiling-stains": {
        title: "Manchas en techo",
        commonCause: "Filtración de agua desde el techo o desde una tubería del piso superior.",
        whyItHappens: "Una mancha de color amarillento o marrón en el techo es una señal inequívoca de una fuga de agua. Ignorarla puede llevar al deterioro del yeso o drywall, causando que se ablande y eventualmente se derrumbe.",
        solutions: [
            "Localizar y reparar la fuente de la fuga de agua antes de hacer cualquier reparación cosmética.",
            "Una vez reparada la fuga, dejar que el área se seque por completo (puede requerir un deshumidificador).",
            "Aplicar un bloqueador de manchas en aerosol para evitar que la mancha reaparezca.",
            "Pintar el techo con una pintura del mismo color y acabado."
        ]
    },
    "electrical-sparks": {
        title: "Chispas en contactos",
        commonCause: "Conexiones de cables flojas, un cortocircuito, o un enchufe o interruptor desgastado.",
        whyItHappens: "Las chispas son arcos eléctricos peligrosos. Pueden ocurrir cuando los cables dentro de la caja eléctrica no están bien apretados, o cuando la humedad entra en contacto con las conexiones. Es una señal de alto riesgo de incendio.",
        solutions: [
            "Cortar la energía del circuito afectado desde el tablero eléctrico inmediatamente.",
            "No volver a usar el enchufe o interruptor hasta que sea revisado.",
            "Llamar a un electricista certificado para que inspeccione y repare las conexiones.",
            "Reemplazar los enchufes o interruptores que estén viejos o dañados."
        ]
    },
    "plumbing-leaks": {
        title: "Fugas de agua en tuberías",
        commonCause: "Corrosión en tuberías metálicas, juntas mal selladas, o presión de agua excesiva.",
        whyItHappens: "Las tuberías, especialmente las de metal, se corroen con el tiempo. Las juntas también pueden deteriorarse. Una fuga, por pequeña que sea, desperdicia agua y puede causar daños estructurales y moho si no se atiende.",
        solutions: [
            "Cerrar la llave de paso principal de agua para detener la fuga.",
            "Para fugas pequeñas y temporales, se puede usar una abrazadera de reparación de tuberías o cinta de silicona autofusionable.",
            "Llamar a un plomero para una reparación permanente, que puede implicar reemplazar una sección de la tubería.",
            "Considerar la instalación de un regulador de presión si la presión del agua en la casa es muy alta."
        ]
    },
    "plumbing-clog": {
        title: "Tuberías obstruidas",
        commonCause: "Acumulación de cabello, grasa, restos de comida o objetos extraños en el desagüe.",
        whyItHappens: "Con el uso diario, los residuos se van adhiriendo a las paredes internas de las tuberías, reduciendo gradualmente el flujo de agua hasta que se produce un bloqueo completo. El uso de productos químicos agresivos puede dañar las tuberías a largo plazo.",
        solutions: [
            "Usar un desatascador de ventosa (chupon) para crear presión y mover la obstrucción.",
            "Retirar y limpiar el sifón (la tubería en forma de 'U' debajo del lavabo).",
            "Utilizar una serpiente de drenaje (sonda) para romper o extraer la obstrucción.",
            "Evitar verter grasa o aceite por el desagüe y usar rejillas para atrapar cabellos."
        ]
    },
    "roof-structure": {
        title: "Daños estructurales en techo",
        commonCause: "Vigas de madera podridas por la humedad, termitas, o sobrecarga de peso por instalaciones no planificadas (como tanques de agua).",
        whyItHappens: "La estructura del techo es su esqueleto. Si las vigas se debilitan, todo el techo puede combarse o incluso colapsar. La humedad es el enemigo número uno, ya que pudre la madera y atrae insectos. Una mala inspección antes de añadir peso extra también es una causa común.",
        solutions: [
            "Inspección urgente por un ingeniero estructural o arquitecto.",
            "Apuntalar el área afectada de inmediato para evitar un colapso.",
            "Reemplazar las vigas dañadas y reforzar las áreas circundantes.",
            "Tratar la madera con productos anti-termitas y antihongos.",
            "Asegurar que la fuente de humedad que causó el daño sea eliminada por completo."
        ]
    },
    "electrical-overload": {
        title: "Sobrecarga eléctrica",
        commonCause: "Conectar demasiados aparatos de alto consumo (planchas, microondas, calentadores) en un solo circuito, especialmente en instalaciones antiguas.",
        whyItHappens: "Cada circuito eléctrico está diseñado para soportar una cantidad máxima de corriente (amperaje). Al excederla, los cables se sobrecalientan, lo que dispara el interruptor automático (breaker) como medida de seguridad. Si esto ocurre repetidamente, es una señal de peligro.",
        solutions: [
            "Distribuir los aparatos de alto consumo en diferentes enchufes que pertenezcan a circuitos distintos.",
            "Evitar el uso de múltiples extensiones o 'ladrones' en un solo tomacorriente.",
            "Contratar a un electricista para crear nuevos circuitos independientes para áreas de alta demanda como la cocina o lavandería.",
            "Nunca reemplazar un interruptor automático por uno de mayor amperaje sin antes actualizar el cableado."
        ]
    },
    "plumbing-pressure": {
        title: "Baja presión de agua",
        commonCause: "Obstrucción por sarro en tuberías o cabezal de la ducha, una fuga no detectada en el sistema, o problemas con el regulador de presión.",
        whyItHappens: "La presión del agua puede disminuir por varias razones. El sarro y la corrosión pueden reducir el diámetro interno de las tuberías con el tiempo. Una fuga, incluso pequeña, hace que se pierda presión en todo el sistema. A veces, la válvula de paso principal no está completamente abierta.",
        solutions: [
            "Verificar que la válvula de paso principal de la casa y la del medidor estén completamente abiertas.",
            "Limpiar los aireadores de los grifos y el cabezal de la ducha sumergiéndolos en vinagre para disolver el sarro.",
            "Revisar si hay fugas ocultas (revisar el medidor de agua sin usar agua en casa).",
            "Si el problema persiste, un plomero puede revisar el regulador de presión o detectar obstrucciones mayores."
        ]
    },
    "plumbing-drain": {
        title: "Drenaje lento",
        commonCause: "Acumulación de cabello y jabón en desagües de ducha, o grasa y restos de comida en el de la cocina. También puede ser por una ventilación de plomería obstruida.",
        whyItHappens: "Un drenaje lento es el primer aviso antes de una obstrucción total. Los residuos se pegan a las paredes de la tubería, atrapando más y más material hasta que el paso del agua se vuelve difícil. Una ventilación de plomería tapada en el techo también puede crear un vacío que impide el drenaje correcto.",
        solutions: [
            "Usar regularmente una mezcla de bicarbonato de sodio y vinagre, seguida de agua caliente, para disolver acumulaciones orgánicas.",
            "Retirar manualmente los cabellos del desagüe de la ducha con una herramienta de gancho de plástico.",
            "Evitar verter grasas o aceites en el fregadero; desecharlos en la basura.",
            "Si el problema es general en toda la casa, revisar que la tubería de ventilación en el techo no esté obstruida por hojas o nidos."
        ]
    }
};