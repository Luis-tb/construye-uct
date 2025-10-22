import { Home, Shield, BrickWall, LampCeiling, Zap, Droplets } from "lucide-react";

export const problemas = [
    {
      id: 1,
      categoria: "cimientos",
      titulo: "Grietas en los Cimientos",
      descripcion: "Aparición de fisuras en la base de la construcción",
      solucion:
        "Verificar el tipo de suelo y reforzar con concreto adicional. Consultar con un ingeniero estructural.",
      costo: "S/. 2,000 - S/. 8,000",
      tiempo: "3-7 días",
      dificultad: "Alta",
      prevencion:
        "Realizar estudio de suelos antes de construir y usar materiales de calidad.",
    },
    {
      id: 2,
      categoria: "paredes",
      titulo: "Humedad en las Paredes",
      descripcion: "Manchas de humedad y moho en muros interiores",
      solucion:
        "Mejorar la ventilación, aplicar impermeabilizante y reparar filtraciones.",
      costo: "S/. 500 - S/. 2,500",
      tiempo: "2-5 días",
      dificultad: "Media",
      prevencion:
        "Instalar buena ventilación y usar materiales impermeables en zonas húmedas.",
    },
    {
      id: 3,
      categoria: "techo",
      titulo: "Goteras en el Techo",
      descripcion: "Filtración de agua durante las lluvias",
      solucion:
        "Revisar y cambiar tejas dañadas, aplicar sellador en juntas y mejorar el sistema de drenaje.",
      costo: "S/. 800 - S/. 3,000",
      tiempo: "1-3 días",
      dificultad: "Media",
      prevencion: "Mantenimiento regular del techo y limpieza de canaletas.",
    },
    {
      id: 4,
      categoria: "electricidad",
      titulo: "Instalación Eléctrica Deficiente",
      descripcion: "Cortes de luz frecuentes o cables expuestos",
      solucion:
        "Contratar electricista certificado para revisar y actualizar la instalación completa.",
      costo: "S/. 1,500 - S/. 5,000",
      tiempo: "3-5 días",
      dificultad: "Alta",
      prevencion:
        "Usar materiales certificados y contratar profesionales calificados.",
    },
    {
      id: 5,
      categoria: "plomeria",
      titulo: "Problemas de Desagüe",
      descripcion: "Tuberías obstruidas o con mal olor",
      solucion:
        "Limpiar tuberías, revisar pendientes y cambiar tramos dañados si es necesario.",
      costo: "S/. 300 - S/. 1,500",
      tiempo: "1-2 días",
      dificultad: "Baja",
      prevencion:
        "Evitar arrojar residuos sólidos y hacer mantenimiento preventivo.",
    },
  ];

export const categorias = [
    { id: "todos", nombre: "Todos los Problemas", icono: Home },
    { id: "cimientos", nombre: "Cimientos", icono: Shield },
    { id: "paredes", nombre: "Paredes", icono: BrickWall },
    { id: "techo", nombre: "Techos", icono: LampCeiling },
    { id: "electricidad", nombre: "Electricidad", icono: Zap },
    { id: "plomeria", nombre: "Plomería", icono: Droplets },
  ];
