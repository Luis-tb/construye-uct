/**
 * Objeto centralizado para las rutas de la aplicación.
 * Usamos `as const` para que TypeScript infiera los tipos de cadena literales,
 * lo que nos permite tener un autocompletado y una seguridad de tipos robusta.
 */
export const ROUTES = {
    HOME: '/',
    PROBLEMS_SOLUTIONS: '/problemas',
    // Ejemplo de ruta dinámica con un parámetro 'id'
    PROBLEM_DETAIL: '/problemas-soluciones/:id',
    PROFESSIONALS: '/profesionales',
    PROFESSIONALS_PROFILE: '/profesionales/:id',
    TIPS: '/consejos',
    TIP_DETAIL: '/consejos/:id',
    CALCULATOR: '/calculadora',
    // Puedes añadir más rutas aquí
    // NOT_FOUND: '*',
} as const;

/**
 * Extrae las claves del objeto ROUTES para usarlas como tipos.
 * Esto nos permitirá asegurar que solo se usen claves válidas.
 * Ejemplo: 'HOME' | 'PROFESSIONALS' | 'PROBLEM_DETAIL'
 */
type AppRouteKey = keyof typeof ROUTES;

/**
 * Función de ayuda para crear rutas dinámicas de forma segura.
 * Reemplaza los parámetros en la plantilla de la ruta (ej. ':id') con los valores proporcionados.
 *
 * @param pathKey La clave de la ruta del objeto ROUTES (ej. 'PROBLEM_DETAIL').
 * @param params Un objeto con los valores para los parámetros dinámicos.
 * @returns La URL final como string.
 *
 * @example
 * createPath('PROBLEM_DETAIL', { id: '123' }) // Devuelve '/problemas/123'
 */
export const createPath = (pathKey: AppRouteKey, params?: Record<string, string | number>): string => {
    let path = ROUTES[pathKey] as string;

    if (params) {
        for (const key in params) {
            path = path.replace(`:${key}`, String(params[key]));
        }
    }

    return path;
};