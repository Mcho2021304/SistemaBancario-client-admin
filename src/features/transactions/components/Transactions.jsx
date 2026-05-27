import { useEffect, useState } from "react";
import { useTransactionsStore } from "../store/transactionsStore";
import { TransactionModal } from "./TransactionModal";
import { showError } from "../../../shared/utils/toast";

const TRANSACTION_TYPES = ["Todos", "Deposit", "Transfer", "Payment"];
const PAGE_SIZE = 10;

export const Transactions = () => {
  const { transactions, loading, error, getTransactions } = useTransactionsStore();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    getTransactions().catch((err) => showError(err.response?.data?.message || "Error al cargar transacciones"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = transactions.filter((tx) => {
    const sender = (tx.senderAccount || "").toString();
    const receptor = (tx.receptorAccount || "").toString();
    const service = (tx.service?.name || tx.service || "").toString();
    const description = (tx.description || "").toString();

    const matchesSearch =
      sender.toLowerCase().includes(search.toLowerCase()) ||
      receptor.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase()) ||
      service.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "Todos" || tx.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    setPage(1);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-GT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(amount || 0);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">Transacciones</h1>
          <p className="text-gray-500 text-sm">Revisa los movimientos de depósito, transferencia y pago.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por cuenta, servicio o descripción..."
            className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#631616]/20"
          />
          <select
            value={typeFilter}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#631616]/20"
          >
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === "Todos" ? "Todos los tipos" : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Tipo</th>
                <th className="text-left px-4 py-3">Origen</th>
                <th className="text-left px-4 py-3">Destino</th>
                <th className="text-right px-4 py-3">Monto</th>
                <th className="text-left px-4 py-3">Fecha</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={6}>
                    Cargando transacciones...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    No hay transacciones para mostrar.
                  </td>
                </tr>
              ) : (
                paginated.map((tx, index) => (
                  <tr key={tx._id || tx.id || `transaction-${index}`} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{tx.type}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.senderAccount || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.receptorAccount || "-"}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(tx.date)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedTransaction(tx)}
                        className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition"
                        style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)" }}
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <p className="text-xs text-gray-600">
            Mostrando {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded border bg-white text-sm disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Anterior
            </button>
            <span className="px-2 py-1.5 text-sm text-gray-700">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded border bg-white text-sm disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={!!selectedTransaction}
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
};