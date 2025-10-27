import type {Professional} from "@/pages/Profesionales/professionals.data.ts";
import type {SortOption} from "@/pages/Profesionales/hooks/useProfessionals.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ProfessionalsListHeader} from "@/pages/Profesionales/components/list/ProfessionalsListHeader.tsx";
import {ProfessionalsListEmptyStates} from "@/pages/Profesionales/components/list/ProfessionalsListEmptyStates.tsx";
import {ProfessionalCard} from "@/pages/Profesionales/components/list/ProfessionalCard.tsx"; // 👈 Importamos el nuevo componente

interface ProfessionalsListProps {
    showList: boolean;
    professionals: Professional[];
    selectedProfessional: Professional | null;
    onProfessionalSelect: (pro: Professional | null) => void;
    onResetFilters: () => void;
    sortBy: SortOption;
    onSortChange: (option: SortOption) => void;
}

/**
 * @component ProfessionalsList
 * @description Orquesta la visualización de la lista de profesionales, incluyendo su cabecera,
 * el área de scroll y los estados vacíos.
 */
export const ProfessionalsList = ({
                                      showList,
                                      professionals,
                                      selectedProfessional,
                                      onProfessionalSelect,
                                      onResetFilters,
                                      sortBy,
                                      onSortChange
                                  }: ProfessionalsListProps) => {
    if (!showList) {
        return <ProfessionalsListEmptyStates type="initial"/>;
    }

    return (
        <div className="flex flex-col h-full space-y-4">
            <ProfessionalsListHeader
                professionalsCount={professionals.length}
                sortBy={sortBy}
                onSortChange={onSortChange}
            />

            <ScrollArea className="h-[80vh]">
                <div className="space-y-4 p-1 pr-2.5">
                    {professionals.length > 0
                        ? professionals.map((pro) => (
                            <ProfessionalCard
                                key={pro.id}
                                professional={pro}
                                isSelected={selectedProfessional?.id === pro.id} // 👈 Pasamos las props
                                onLocateClick={onProfessionalSelect}
                            />
                        ))
                        : <ProfessionalsListEmptyStates type="no-results" onResetFilters={onResetFilters}/>
                    }
                </div>
            </ScrollArea>
        </div>
    );
};