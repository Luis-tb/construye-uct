// src/components/ui/badge.tsx (Modificado)

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority" // Solo importamos el TIPO

// 🚨 Importar la constante desde el nuevo archivo
import { badgeVariants } from "./badge-variants" // Asumiendo que está en la misma carpeta

import { cn } from "@/lib/utils"

// 🚨 Eliminada la definición de badgeVariants de aquí

function Badge({
                   className,
                   variant,
                   asChild = false,
                   ...props
               }: React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    )
}

// 🚨 Solo exporta el componente Badge
export { Badge }

// 🚨 Eliminada la exportación de badgeVariants
// export { Badge, badgeVariants }