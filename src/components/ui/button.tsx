import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
// ⚠️ Importa 'type VariantProps' y 'cva' para el componente si fuera necesario,
// pero en este caso, solo necesitas 'type VariantProps'.
import {type VariantProps} from "class-variance-authority"

// 🚨 Importar la constante desde el nuevo archivo
import { buttonVariants } from "./button-variants" // Asegúrate de que la ruta sea correcta

import {cn} from "@/lib/utils"

// 🚨 La constante buttonVariants ya NO está definida aquí

function Button({
                    className,
                    variant,
                    size,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}

// 🚨 Solo exporta el componente Button
export { Button }

// 🚨 Eliminada la exportación de buttonVariants para cumplir con Fast Refresh
// Antes: export { Button, buttonVariants }