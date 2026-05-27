import { useEffect, useState } from "react";
import { useShoppingsStore } from "../store/shoppingsStore";
import { ShoppingModal } from "./ShoppingModal";

const STATUS_OPTIONS = ["Todos", "Completado", "Anulado", "Pendiente"];
const PAGE_SIZE = 8;

export const Shoppings = () => {
  const { shoppings, loading, error, getShoppings, deleteShopping } = useShoppingsStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedShopping, setSelectedShopping] = useState(null);

  useEffect(() => {
    getShoppings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = shoppings.filter((shopping) => {
    const accountNumber = (shopping.accountNumber || "").toString();
    const userId = (shopping.userId || "").toString();
    const description = (shopping.description || "").toString();
    const matchesSearch =
      accountNumber.toLowerCase().includes(search.toLowerCase()) ||
      userId.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "Todos" || shopping.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(amount || 0);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">Compras</h1>
          <p className="text-gray-500 text-sm">Administra las compras realizadas desde las cuentas.</p>
        </div>

        <button
          onClick={() => {
            setSelectedShopping(null);
            setShowModal(true);
          }}
          className="bg-main-blue px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-lg flex items-center gap-2"
        >
          <span>+</span> Nueva Compra
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por usuario, cuenta o descripción..."
            className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#631616]/20"
          />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#631616]/20"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status === "Todos" ? "Todos los estados" : status}
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
                <th className="text-left px-4 py-3">Usuario</th>
                <th className="text-left px-4 py-3">Cuenta Origen</th>
                <th className="text-left px-4 py-3">Cuenta Destino</th>
                <th className="text-right px-4 py-3">Monto</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-left px-4 py-3">Fecha</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={7}>
                    Cargando compras...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                    No hay compras para mostrar.
                  </td>
                </tr>
              ) : (
                paginated.map((shopping, index) => (
                  <tr key={shopping._id || shopping.id || `shopping-${index}`} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{shopping.userId}</td>
                    <td className="px-4 py-3 text-gray-600">{shopping.accountNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{shopping.receptorAccount || "-"}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">{formatCurrency(shopping.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${shopping.status === "Completado" ? "bg-green-100 text-green-700" : shopping.status === "Anulado" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {shopping.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{new Date(shopping.date).toLocaleDateString("es-GT")}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedShopping(shopping)}
                        className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition mr-2"
                        style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)" }}
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => deleteShopping(shopping._id)}
                        className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold hover:bg-red-600 transition bg-red-500"
                      >
                        Eliminar
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

      <ShoppingModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <ShoppingModal isOpen={!!selectedShopping} shopping={selectedShopping} onClose={() => setSelectedShopping(null)} />
    </div>
  );
};