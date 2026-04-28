import { TournamentModal } from "./TournamentModal.jsx";

export const Tournaments = () => {
    return (
        <div className="p-4">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-main-blue">
                Gestión de Transferencias
            </h1>
            <p className="text-gray-500 text-sm">
                Administra y supervisa los movimientos entre cuentas
            </p>
        </div>

        <button className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition">
            + Nueva Transferencia
        </button>
    </div>

    {/* GRID */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD TRANSFERENCIA */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-main-blue">
                        Q 4,200.00
                    </h2>
                    <span className="text-[10px] font-bold text-gray-400">#TR-8829</span>
                </div>

                {/* BADGES */}
                <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                        ACH INTERBANCARIA
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                        EJECUTADA
                    </span>
                </div>

                {/* INFO */}
                <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-400 text-xs uppercase block">Origen:</span>
                        Cuenta Monetaria ****4521
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-400 text-xs uppercase block">Destino:</span>
                        Juan Escutia (Banco Industrial)
                    </p>
                    <p className="text-xs text-gray-400 mt-2 italic">
                        28/04/2026 - 10:30 AM
                    </p>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 mt-5">
                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white hover:opacity-90 flex items-center justify-center gap-2">
                        📄 Comprobante
                    </button>

                    <button className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                        🗑️ Revertir
                    </button>
                </div>
            </div>
        </div>

    </div>

            {/* MODAL (solo visual) */}
            <TournamentModal isOpen={false} />
        </div>
    );
};