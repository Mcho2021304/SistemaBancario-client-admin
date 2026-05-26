import { useEffect, useState } from "react";
import { useAccountsStore } from "../store/accountsStore";
import { AccountModal } from "./AccountModal";

const ACCOUNT_TYPES = ["Todos", "Monetaria", "Ahorro"];
const ACCOUNT_STATUS = ["Todos", "Activo", "Inactivo"];
const PAGE_SIZE = 8;

export const Accounts = () => {
  const { accounts, loading, error, getAccounts } = useAccountsStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = accounts.filter((account) => {
    const accountNumber = (account.accountNumber || "").toString();
    const userId = (account.userId || "").toString();
    const matchesSearch =
      accountNumber.toLowerCase().includes(search.toLowerCase()) ||
      userId.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "Todos" || account.accountType === typeFilter;
    const matchesStatus =
      statusFilter === "Todos" ||
      (statusFilter === "Activo" ? account.status === true : account.status === false);
    return matchesSearch && matchesType && matchesStatus;
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

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(value || 0);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">Cuentas</h1>
          <p className="text-gray-500 text-sm">
            Administra cuentas, consulta saldos y cambia el estado de las cuentas.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedAccount(null);
            setShowModal(true);
          }}
          className="bg-main-blue px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-lg flex items-center gap-2"
        >
          <span>+</span> Agregar Cuenta
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por cuenta o usuario..."
            className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <select
            value={typeFilter}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {ACCOUNT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === "Todos" ? "Todos los tipos" : type}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {ACCOUNT_STATUS.map((status) => (
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
                <th className="text-left px-4 py-3">Cuenta</th>
                <th className="text-left px-4 py-3">Usuario</th>
                <th className="text-right px-4 py-3">Saldo</th>
                <th className="text-left px-4 py-3">Tipo</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={6}>
                    Cargando cuentas...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    No hay cuentas para mostrar.
                  </td>
                </tr>
              ) : (
                paginated.map((account, index) => (
                  <tr key={account._id || account.id || `account-${index}`} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{account.accountNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{account.userId}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      {formatCurrency(account.balance)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {account.accountType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          account.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {account.status ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedAccount(account);
                          setShowModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition"
                        style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                      >
                        Ver / Editar
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
            <span className="px-2 py-1.5 text-sm text-gray-700">
              {page} / {totalPages}
            </span>
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

      <AccountModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
      />
    </div>
  );
};
