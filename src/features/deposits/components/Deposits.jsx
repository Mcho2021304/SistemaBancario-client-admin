import { useEffect, useState } from "react";
import { useDepositsStore } from "../store/depositsStore";
import { DepositsModal } from "./DepositsModal";

const METHODS = ["Todos", "Efectivo", "Transferencia"];
const STATUSES = ["Todos", "Completado", "Anulado"];
const PAGE_SIZE = 8;

export const Deposits = () => {
    const { deposits, loading, error, getDeposits } = useDepositsStore();

    const [showCreate, setShowCreate] = useState(false);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [search, setSearch] = useState("");
    const [methodFilter, setMethodFilter] = useState("Todos");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [page, setPage] = useState(1);

    useEffect(() => {
        getDeposits();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtered = deposits.filter((d) => {
        const accountNumber = (d.accountNumber || "").toString();
        const matchesSearch = accountNumber.toLowerCase().includes(search.toLowerCase());
        const matchesMethod = methodFilter === "Todos" || d.method === methodFilter;
        const matchesStatus = statusFilter === "Todos" || d.status === statusFilter;
        return matchesSearch && matchesMethod && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleMethodChange = (e) => {
        setMethodFilter(e.target.value);
        setPage(1);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
        setPage(1);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-GT", {
            style: "currency",
            currency: "GTQ",
        }).format(amount);
    };

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Depósitos</h1>
                    <p className="text-gray-500 text-sm">
                        Administra y supervisa los depósitos registrados en el sistema
                    </p>
                </div>

                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-main-blue px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-lg flex items-center gap-2"
                >
                    <span>+</span> Nuevo Depósito
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Buscar por número de cuenta..."
                        className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <select
                        value={methodFilter}
                        onChange={handleMethodChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        {METHODS.map((m) => (
                            <option key={m} value={m}>
                                {m === "Todos" ? "Todos los métodos" : m}
                            </option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {s === "Todos" ? "Todos los estados" : s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="text-left px-4 py-3">Cuenta</th>
                                <th className="text-right px-4 py-3">Monto</th>
                                <th className="text-left px-4 py-3">Método</th>
                                <th className="text-left px-4 py-3">Estado</th>
                                <th className="text-left px-4 py-3">Fecha</th>
                                <th className="text-right px-4 py-3">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td className="px-4 py-6 text-center text-gray-400" colSpan={6}>
                                        Cargando depósitos...
                                    </td>
                                </tr>
                            ) : paginated.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                                        No hay depósitos para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((d, index) => (
                                    <tr key={d._id || d.id || `deposit-${index}`} className="border-t hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {d.accountNumber}
                                        </td>

                                        <td className="px-4 py-3 text-right font-semibold text-green-600">
                                            {formatCurrency(d.amount)}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                                {d.method}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    d.status === "Completado"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {d.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {formatDate(d.date)}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => setSelectedDeposit(d)}
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

                {/* PAGINACIÓN */}
                <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
                    <p className="text-xs text-gray-600">
                        Mostrando {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} -{" "}
                        {Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
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

            {/* MODALES */}
            <DepositsModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
            />

            <DepositsModal
                isOpen={!!selectedDeposit}
                deposit={selectedDeposit}
                onClose={() => setSelectedDeposit(null)}
            />
        </div>
    );
};