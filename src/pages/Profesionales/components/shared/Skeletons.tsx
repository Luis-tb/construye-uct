import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

/**
 * Esqueleto para una tarjeta de profesional individual.
 */
const ProfessionalCardSkeleton = () => (
    <Card className="py-4 mb-3">
        <CardContent>
            <div className="flex gap-3">
                <Skeleton className="w-16 h-16 rounded-full flex-shrink-0"/>
                <div className="flex-1 min-w-0 space-y-3">
                    <Skeleton className="h-5 w-3/4"/>
                    <Skeleton className="h-4 w-1/2"/>
                    <div className="flex gap-2">
                        <Skeleton className="h-4 w-20"/>
                        <Skeleton className="h-4 w-24"/>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-9 w-1/2"/>
                        <Skeleton className="h-9 w-1/2"/>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

/**
 * Esqueleto para la lista completa de profesionales.
 */
export const ProfessionalsListSkeleton = () => (
    <div className="space-y-4 p-1 pr-4">
        {[...Array(4)].map((_, i) => <ProfessionalCardSkeleton key={i}/>)}
    </div>
);

/**
 * Esqueleto para el componente del mapa.
 */
export const ProfessionalsMapSkeleton = () => (
    <Skeleton className="w-full h-full min-h-[70vh] rounded-lg"/>
);