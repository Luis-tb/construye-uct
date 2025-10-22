import React, {useState} from 'react';
import {AlertTriangle, Calculator as CalculatorIcon, CircleDollarSign, ClipboardList} from 'lucide-react';

// --- Constantes de Materiales y Costos (Aproximados en PEN) ---
const costos = {
    cemento: 25,   // por bolsa de 42.5kg
    arena: 50,     // por m³
    piedra: 60,    // por m³
    ladrillo: 1.20,  // por unidad King Kong 18 huecos
    pintura: 50,     // por galón
};

const Calculator: React.FC = () => {
    const [tipoCalculo, setTipoCalculo] = useState('');
    const [largo, setLargo] = useState('');
    const [ancho, setAncho] = useState('');
    const [alto, setAlto] = useState(''); // Usaremos este estado para "Alto" o "Espesor"
    const [resultado, setResultado] = useState<string | null>(null);
    const [costoTotal, setCostoTotal] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Limpia los estados cuando se cambia el tipo de cálculo
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoCalculo(e.target.value);
        setLargo('');
        setAncho('');
        setAlto('');
        setResultado(null);
        setCostoTotal(null);
        setError(null);
    };

    const handleCalculate = () => {
        setResultado(null);
        setCostoTotal(null);
        setError(null);

        const numLargo = parseFloat(largo);
        const numAncho = parseFloat(ancho);
        const numAlto = parseFloat(alto);

        if (!tipoCalculo) {
            setError('Por favor, seleccione un tipo de cálculo.');
            return;
        }

        let res = '';
        let costo = 0;

        switch (tipoCalculo) {
            case 'concreto': {
                if (isNaN(numLargo) || isNaN(numAncho) || isNaN(numAlto) || numLargo <= 0 || numAncho <= 0 || numAlto <= 0) {
                    setError("Para concreto, se requieren valores válidos para Largo, Ancho y Espesor.");
                    return;
                }
                const volumen = numLargo * numAncho * numAlto;
                const cemento = Math.ceil(volumen * 7.5);
                const arena = parseFloat((volumen * 0.5).toFixed(2));
                const piedra = parseFloat((volumen * 0.6).toFixed(2));
                costo = (cemento * costos.cemento) + (arena * costos.arena) + (piedra * costos.piedra);
                res = `Para un volumen de ${volumen.toFixed(2)} m³, necesitarás aprox: ${cemento} bolsas de cemento, ${arena} m³ de arena y ${piedra} m³ de piedra.`;
                break;
            }
            case 'ladrillos': {
                if (isNaN(numLargo) || isNaN(numAlto) || numLargo <= 0 || numAlto <= 0) {
                    setError("Para ladrillos, se requieren valores válidos para Largo y Alto.");
                    return;
                }
                const area = numLargo * numAlto;
                const totalLadrillos = Math.ceil(area * 37);
                costo = totalLadrillos * costos.ladrillo;
                res = `Para un área de ${area.toFixed(2)} m², necesitarás aprox: ${totalLadrillos} ladrillos.`;
                break;
            }
            case 'pintura': {
                if (isNaN(numLargo) || isNaN(numAncho) || isNaN(numAlto) || numLargo <= 0 || numAncho <= 0 || numAlto <= 0) {
                    setError("Para pintura, se requieren valores válidos para Largo, Ancho y Alto.");
                    return;
                }
                const areaParedes = (numLargo * numAlto * 2) + (numAncho * numAlto * 2);
                const totalGalones = Math.ceil(areaParedes / 30);
                costo = totalGalones * costos.pintura;
                res = `Para un área de ${areaParedes.toFixed(2)} m², necesitarás aprox: ${totalGalones} galones de pintura (para una mano).`;
                break;
            }
        }

        setResultado(res);
        setCostoTotal(costo > 0 ? parseFloat(costo.toFixed(2)) : null);
    };

    const renderInputs = () => {
        switch (tipoCalculo) {
            case 'concreto':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input min={0} value={largo} onChange={e => setLargo(e.target.value)} type="number"
                               placeholder="Largo (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        <input min={0} value={ancho} onChange={e => setAncho(e.target.value)} type="number"
                               placeholder="Ancho (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        <input min={0} value={alto} onChange={e => setAlto(e.target.value)} type="number"
                               placeholder="Espesor (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    </div>
                );
            case 'ladrillos':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input min={0} value={largo} onChange={e => setLargo(e.target.value)} type="number"
                               placeholder="Largo del muro (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        <input min={0} value={alto} onChange={e => setAlto(e.target.value)} type="number"
                               placeholder="Alto del muro (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    </div>
                );
            case 'pintura':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input min={0} value={largo} onChange={e => setLargo(e.target.value)} type="number"
                               placeholder="Largo de la habitación (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        <input min={0} value={ancho} onChange={e => setAncho(e.target.value)} type="number"
                               placeholder="Ancho de la habitación (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        <input min={0} value={alto} onChange={e => setAlto(e.target.value)} type="number"
                               placeholder="Alto de la habitación (m)"
                               className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 py-16 md:py-20">
            <main className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Calculadora de Materiales</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Estima la cantidad de
                        materiales y el costo aproximado para tu proyecto.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-8">

                    <div>
                        <label className="block text-lg font-semibold text-gray-800 mb-3">1. ¿Qué deseas
                            calcular?</label>
                        <select
                            value={tipoCalculo}
                            onChange={handleTypeChange}
                            className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="concreto">Concreto (para pisos, techos, etc.)</option>
                            <option value="ladrillos">Ladrillos (para muros)</option>
                            <option value="pintura">Pintura (para paredes de una habitación)</option>
                        </select>
                    </div>

                    {tipoCalculo && (
                        <div>
                            <label className="block text-lg font-semibold text-gray-800 mb-3">2. Ingresa las
                                medidas</label>
                            {renderInputs()}
                        </div>
                    )}

                    <div className="text-center pt-4">
                        <button
                            onClick={handleCalculate}
                            disabled={!tipoCalculo}
                            className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
                        >
                            <CalculatorIcon className="h-6 w-6 mr-3"/>
                            Calcular Estimación
                        </button>
                    </div>
                </div>

                {error && (
                    <div
                        className="mt-10 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-center shadow-md animate-fade-in">
                        <div className="flex justify-center items-center gap-3">
                            <AlertTriangle className="h-6 w-6 text-red-600"/>
                            <h3 className="text-xl font-bold text-red-800">Error en los datos</h3>
                        </div>
                        <p className="text-red-700 mt-2 text-lg">{error}</p>
                    </div>
                )}

                {resultado && (
                    <div
                        className="mt-10 p-8 bg-green-50 border-2 border-green-200 rounded-2xl text-center shadow-lg animate-fade-in">
                        <h3 className="text-2xl font-bold text-green-900 mb-6">Resultados de la Estimación</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white p-4 rounded-xl">
                                <ClipboardList className="h-8 w-8 text-green-700"/>
                                <p className="text-lg text-gray-800 text-left flex-1">{resultado}</p>
                            </div>
                            {costoTotal !== null && (
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl">
                                    <CircleDollarSign className="h-8 w-8 text-green-700"/>
                                    <p className="text-lg font-semibold text-gray-800 text-left flex-1">Costo Total
                                        Aproximado: <span
                                            className="font-bold text-green-800 text-xl">S/ {costoTotal}</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Calculator;
