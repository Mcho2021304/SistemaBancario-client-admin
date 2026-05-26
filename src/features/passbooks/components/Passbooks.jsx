import { useEffect, useState } from "react";
import { usePassbooksStore } from "../store/passbooksStore";
import { PassbookModal } from "./PassbookModal";
import { showError } from "../../../shared/utils/toast";

const PAGE_SIZE = 8;

export const Passbooks = () => {
  const { passbooks, loading, error, getPassbooks, deletePassbook } = usePassbooksStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPassbooks().catch((err) => showError(err.response?.data?.message || "Error al cargar libretas"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = passbooks.filter((passbook) => {
    const userId = (passbook.userId || "").toString();
    const accountNumber = (passbook.accountNumber || "").toString();
    const description = (passbook.description || "").toString();
    return (
      userId.toLowerCase().includes(search.toLowerCase()) ||
      accountNumber.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-ES");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">Libretas de Ahorros</h1>
          <p className="text-gray-500 text-sm">
            Gestiona las libretas de ahorros emitidas a los clientes.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-main-blue px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-lg flex items-center gap-2"
        >
          <span>+</span> Nueva libreta
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por usuario, cuenta o descripción..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
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
                <th className="text-left px-4 py-3">Cuenta</th>
                <th className="text-left px-4 py-3">Descripción</th>
                <th className="text-left px-4 py-3">Fecha</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={6}>
                    Cargando libretas...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    No hay libretas para mostrar.
                  </td>
                </tr>
              ) : (
                paginated.map((passbook, index) => (
                  <tr key={passbook._id || passbook.id || `passbook-${index}`} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{passbook.userId}</td>
                    <td className="px-4 py-3 text-gray-600">{passbook.accountNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{passbook.description}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(passbook.date)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          passbook.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {passbook.status ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deletePassbook(passbook._id || passbook.id).catch((err) => showError(err.response?.data?.message || "Error al eliminar libreta"))}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
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

      <PassbookModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};