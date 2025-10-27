import {useProfessionals} from "@/pages/Profesionales/hooks/useProfessionals.ts";
import {RequestForm} from "@/pages/Profesionales/components/RequestForm.tsx";
import {Filters} from "@/pages/Profesionales/components/Filters.tsx";
import {ProfessionalsMap} from "@/pages/Profesionales/components/ProfessionalsMap.tsx";
import {ProfessionalsList} from "@/pages/Profesionales/components/ProfessionalsList.tsx";
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {List, Map} from "lucide-react";

export default function RequestProfessionalPage() {
    // Vista activa en móvil ('list' o 'map')
    const [mobileView, setMobileView] = useState<'list' | 'map'>('map');
    const {
        showProfessionals,
        selectedProfessional, setSelectedProfessional,
        userLocation, locationStatus, locationError,
        filteredProfessionals,
        setUserLocationManually,
        maxDistance, minRating,
        selectedSpecialty, setSelectedSpecialty,
        sortBy, setSortBy, // <-- Añadido selectedSpecialty
        handleSearch,
        resetFilters, applyFilters,
    } = useProfessionals();

    return (
        <div className="container max-w-7xl m-auto px-4 py-8">

            {/* --- Layout para Desktop --- */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6">
                {/* Left Column - Form & Filters */}
                <div className="lg:col-span-3 space-y-6 z-10">
                    <RequestForm
                        onSearch={handleSearch}
                        specialty={selectedSpecialty}
                        onSpecialtyChange={setSelectedSpecialty}
                        onLocationSelect={setUserLocationManually}
                    />

                    {/* Filters */}
                    {showProfessionals && (
                        <Filters
                            maxDistance={maxDistance}
                            minRating={minRating}
                            onApplyFilters={applyFilters}
                            filteredCount={filteredProfessionals.length}
                        />
                    )}
                </div>

                {/* Middle Column - Map */}
                <div className="hidden lg:block lg:col-span-5">
                    <ProfessionalsMap
                        mapId="desktop-map"
                        showMap={showProfessionals}
                        userLocation={userLocation}
                        locationStatus={locationStatus}
                        locationError={locationError}
                        professionals={filteredProfessionals}
                        selectedProfessional={selectedProfessional}
                        onProfessionalSelect={setSelectedProfessional}
                        onMapClick={setUserLocationManually}
                    />
                </div>

                {/* Right Column - Professionals List */}
                <div className="hidden lg:block lg:col-span-4">
                    <ProfessionalsList
                        showList={showProfessionals}
                        professionals={filteredProfessionals}
                        selectedProfessional={selectedProfessional}
                        onProfessionalSelect={setSelectedProfessional}
                        onResetFilters={resetFilters}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>
            </div>

            {/* --- Layout para Móvil y Tablet --- */}
            <div className="lg:hidden flex flex-col gap-6">
                {/* Formulario y Filtros siempre visibles */}
                <div className="space-y-6 z-10">
                    <RequestForm
                        onSearch={handleSearch}
                        specialty={selectedSpecialty}
                        onSpecialtyChange={setSelectedSpecialty}
                        onLocationSelect={setUserLocationManually}
                    />
                    {showProfessionals && (
                        <Filters
                            maxDistance={maxDistance}
                            minRating={minRating}
                            onApplyFilters={applyFilters}
                            filteredCount={filteredProfessionals.length}
                        />
                    )}
                </div>

                {/* Pestañas para cambiar entre Lista y Mapa */}
                {showProfessionals && (
                    <Tabs value={mobileView} onValueChange={(v) => setMobileView(v as 'list' | 'map')}
                          className="w-full h-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="map"><Map className="w-4 h-4 mr-2"/>Mapa</TabsTrigger>
                            <TabsTrigger value="list"><List className="w-4 h-4 mr-2"/>Lista</TabsTrigger>
                        </TabsList>
                        <TabsContent value="map" className="mt-4">
                            <ProfessionalsMap
                                mapId="mobile-map"
                                showMap={showProfessionals}
                                userLocation={userLocation}
                                locationStatus={locationStatus}
                                locationError={locationError}
                                professionals={filteredProfessionals}
                                selectedProfessional={selectedProfessional}
                                onProfessionalSelect={setSelectedProfessional}
                                onMapClick={setUserLocationManually}
                            />
                        </TabsContent>
                        <TabsContent value="list" className="mt-4">
                            <ProfessionalsList
                                showList={showProfessionals}
                                professionals={filteredProfessionals}
                                selectedProfessional={selectedProfessional}
                                onProfessionalSelect={setSelectedProfessional}
                                onResetFilters={resetFilters}
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                            />
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    );
}