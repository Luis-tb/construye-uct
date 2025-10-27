import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "./index.css";
import 'leaflet/dist/leaflet.css'; // <-- Importación del CSS de Leaflet
import {Toaster} from "sonner";
import {ROUTES} from "@/config/routes.ts";
import Layout from "@/components/layout/Layout.tsx";
import HomePage from "@/pages/Home";
import Guides from "@/pages/Problemas";
import ProblemDetail from "@/components/guide/ProblemDetail.tsx";
import Calculator from "@/pages/Calculator";
import Consejos from "@/pages/Consejos";
import Profesionales from "@/pages/Profesionales";
import ProfessionalDetail from "@/pages/Profesionales/ProfessionalDetail.tsx"; // 👈 Importar nuevo componente

// 1. Instanciamos el cliente de TanStack Query fuera del render.
const queryClient = new QueryClient();

// 2. Definimos la estructura del router aquí.
const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Layout/>, // El Layout ahora contiene el Outlet y el Chatbot
        children: [
            {index: true, element: <HomePage/>},
            {path: ROUTES.TIPS.substring(1), element: <Consejos/>},
            {path: ROUTES.TIP_DETAIL.substring(1), element: <Consejos/>},
            {path: ROUTES.PROBLEMS_SOLUTIONS.substring(1), element: <Guides/>},
            {path: ROUTES.PROBLEM_DETAIL.substring(1), element: <ProblemDetail/>},
            {path: ROUTES.CALCULATOR.substring(1), element: <Calculator/>},
            {path: ROUTES.PROFESSIONALS.substring(1), element: <Profesionales/>},
            {path: `${ROUTES.PROFESSIONALS.substring(1)}/:id`, element: <ProfessionalDetail/>}, // 👈 Nueva ruta
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <Toaster richColors/>
        </QueryClientProvider>
    </StrictMode>
);
