export const Fields = () => {
    return (
        <div className="p-4">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-main-blue">
                Gestión de Depósitos
            </h1>
            <p className="text-gray-500 text-sm">
                Administra y supervisa los depósitos registrados en el sistema
            </p>
        </div>

        <button className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2">
            <span>+</span> Nuevo Depósito
        </button>
    </div>

    {/* GRID */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD DE DEPÓSITO */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">

            {/* REPRESENTACIÓN VISUAL / COMPROBANTE */}
            <div className="w-full h-48 bg-slate-50 flex items-center justify-center border-b border-gray-100">
                <div className="text-center">
                    <span className="text-5xl block mb-2">📄</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Comprobante Digital</span>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-main-blue">
                        Q 1,250.00
                    </h2>
                    <span className="px-2 py-1 text-[10px] rounded bg-green-100 text-green-700 font-bold uppercase">
                        Completado
                    </span>
                </div>

                {/* BADGES FINANCIEROS */}
                <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                        Cuenta: 000-4562-1
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                        Efectivo
                    </span>
                </div>

                {/* INFO DEL DEPÓSITO */}
                <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-600 font-medium">
                        <span className="text-gray-400">Cliente:</span> Juan Pérez
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                        No. Transacción: 78954210
                    </p>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-3 mt-5">
                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
                        👁️ Ver Detalle
                    </button>

                    <button className="flex-1 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition">
                        🗑️ Anular
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>
    );
};