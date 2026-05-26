export const TransactionModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
        <div className="p-5 bg-main-blue text-white">
          <h2 className="text-xl font-bold">Detalle de Transacción</h2>
          <p className="text-sm opacity-80 mt-1">Revisa la información completa de la transacción</p>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Tipo</p>
              <p className="mt-1 font-semibold text-gray-800">{transaction.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Fecha</p>
              <p className="mt-1 font-semibold text-gray-800">
                {new Date(transaction.date).toLocaleString("es-GT", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Cuenta origen</p>
              <p className="mt-1 font-semibold text-gray-800">{transaction.senderAccount || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Cuenta destino</p>
              <p className="mt-1 font-semibold text-gray-800">{transaction.receptorAccount || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Monto</p>
              <p className="mt-1 font-semibold text-green-700">{new Intl.NumberFormat("es-GT", { style: "currency", currency: "GTQ" }).format(transaction.amount)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Servicio</p>
              <p className="mt-1 font-semibold text-gray-800">{transaction.service ? transaction.service.name || transaction.service : "N/A"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Descripción</p>
            <p className="mt-1 text-gray-700">{transaction.description}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-main-blue text-white font-semibold hover:opacity-90 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};