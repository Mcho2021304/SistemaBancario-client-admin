import { useEffect, useState } from "react";
import { useUsersStore } from "../store/usersStore";
import { CreateUserModal } from "./CreateUserModal";
import { UserDetailModal } from "./UserDetailModal";

const ROLES = ["Todos", "Admin", "Client"];
const PAGE_SIZE = 8;

export const Users = () => {
    const { users, loading, error, getUsers } = useUsersStore();

    const [showCreate, setShowCreate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Todos");
    const [page, setPage] = useState(1);

    useEffect(() => {
        getUsers();
    }, []);

    const filtered = users.filter((u) => {
        const matchesSearch =
            `${u.name} ${u.surname}`.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "Todos" || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
        setPage(1);
    };

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#631616]">Usuarios</h1>
                    <p className="text-gray-500 text-sm">
                        Administra usuarios, consulta su información y cambia su rol
                    </p>
                </div>

                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-[#631616] px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition shadow-lg flex items-center gap-2"
                >
                    <span>+</span> Agregar Usuario
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre o correo..."
                        className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#631616]"
                    />
                    <select
                        value={roleFilter}
                        onChange={handleRoleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#631616]"
                    >
                        {ROLES.map((r) => (
                            <option key={r} value={r}>{r === "Todos" ? "Todos los roles" : r}</option>
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
                                <th className="text-left px-4 py-3">Nombre</th>
                                <th className="text-left px-4 py-3">Correo</th>
                                <th className="text-left px-4 py-3">Rol</th>
                                <th className="text-right px-4 py-3">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td className="px-4 py-6 text-center text-gray-400" colSpan={4}>
                                        Cargando usuarios...
                                    </td>
                                </tr>
                            ) : paginated.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                                        No hay usuarios para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((u) => (
                                    <tr key={u._id} className="border-t hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {u.name} {u.surname}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {u.email}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    u.role === "Admin"
                                                        ? "bg-main-blue text-white"
                                                        : "bg-red-50 text-red-700"
                                                }`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => setSelectedUser(u)}
                                                className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition"
                                                style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)" }}
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
            <CreateUserModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
            />

            <UserDetailModal
                isOpen={!!selectedUser}
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
            />
        </div>
    );
};
