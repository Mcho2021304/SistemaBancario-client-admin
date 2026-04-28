import { Spinner } from "../../auth/components/Spinner";
import { TeamModal } from "./TeamModal.jsx";

export const Teams = () => {
    const loading = false;

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-main-blue">
                Gestión de Servicios
            </h1>
            <p className="text-gray-500 text-sm">
                Configura y administra el catálogo de servicios financieros
            </p>
        </div>

        <button className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 shadow-md transition">
            + Agregar Servicio
        </button>
    </div>

    {/* GRID */}
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD SERVICIO 1 */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">

            {/* ICONO/REPRESENTACIÓN */}
            <div className="w-full h-52 bg-slate-50 flex flex-col items-center justify-center border-b border-gray-50">
                <span className="text-6xl mb-2">💳</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Financiero</span>
            </div>

            {/* CONTENIDO */}
            <div className="p-5">
                <h2 className="text-xl font-bold text-main-blue">
                    Tarjetas de Crédito
                </h2>

                <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                        Tasa: 15%
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
                        Activo
                    </span>
                </div>

                <p className="text-sm text-gray-700 mt-3 truncate font-medium">
                    <span className="text-gray-400 font-normal">Encargado: </span>
                    Dpto. de Ventas
                </p>

                {/* BOTONES */}
                <div className="flex gap-3 mt-5">
                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition">
                        ✏️ Editar
                    </button>

                    <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>

        {/* CARD SERVICIO 2 */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            
            <div className="w-full h-52 bg-slate-50 flex flex-col items-center justify-center border-b border-gray-50">
                <span className="text-6xl mb-2">💰</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ahorro</span>
            </div>

            <div className="p-5">
                <h2 className="text-xl font-bold text-main-blue">
                    Cuentas de Ahorro
                </h2>

                <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                        Tasa: 4% anual
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
                        Estandar
                    </span>
                </div>

                <p className="text-sm text-gray-700 mt-3 truncate font-medium">
                    <span className="text-gray-400 font-normal">Encargado: </span>
                    Banca Personal
                </p>

                <div className="flex gap-3 mt-5">
                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90">
                        ✏️ Editar
                    </button>

                    <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>

    </div>

    {/* MODAL (Placeholder) */}
    {/* <ServiceModal /> */}
</div>
    );
};