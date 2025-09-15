import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Guide from "./Guide.tsx";
import Layout from "./components/layout/Layout.tsx";

// Placeholder components for new routes
export const Profesionales = () => <div>Página de Profesionales (en construcción)</div>;
export const Contacto = () => <div>Página de Contacto (en construcción)</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // This makes Guide the default child route for "/"
        element: <Guide />,
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
