import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home.tsx";
import Guides from "./Guides.tsx";
import ProblemDetail from "./components/guide/ProblemDetail.tsx";
import Layout from "./components/layout/Layout.tsx";
import Calculator from "./Calculator.tsx";

// Componente de Profesionales actualizado
import Profesionales from "./Profesionales.tsx";
export const Contacto = () => <div>Página de Contacto (en construcción)</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "guias",
        element: <Guides />,
      },
      {
        path: "problema/:id",
        element: <ProblemDetail />,
      },
      {
        path: "calculadora",
        element: <Calculator />,
      },
      {
        path: "profesionales",
        element: <Profesionales />,
      },
      {
        path: "contacto",
        element: <Contacto />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
