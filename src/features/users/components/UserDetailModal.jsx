import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsersStore } from "../store/usersStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

const inputClass =
    "w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition";

export const UserDetailModal = ({ isOpen, user, onClose }) => {
    const { updateUser, deactivateUser, loading } = useUsersStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                surname: user.surname || "",
                email: user.email || "",
                role: user.role || "Client",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            await updateUser(user._id, data);
            showSuccess("Usuario actualizado correctamente");
            onClose();
        } catch (error) {
            showError(error.response?.data?.message || "Error al actualizar usuario");
        }
    };

    const handleDeactivate = async () => {
        const confirmed = window.confirm(
            `¿Seguro que deseas inactivar a ${user.name} ${user.surname}? Esta acción también desactivará sus cuentas bancarias.`
        );
        if (!confirmed) return;

        try {
            await deactivateUser(user._id);
            showSuccess("Usuario inactivado correctamente");
            onClose();
        } catch (error) {
            showError(error.response?.data?.message || "Error al inactivar usuario");
        }
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">Editar Usuario</h2>
                    <p className="text-xs sm:text-sm opacity-80">
                        Modifica los datos del usuario
                    </p>
                </div>

                {/* CONTENT */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 space-y-4 overflow-y-auto"
                >
                    {/* INFO READONLY */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-500">ID del usuario</p>
                        <p className="text-sm font-medium break-all text-gray-700">{user._id}</p>
                    </div>

                    {/* CAMPOS EDITABLES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Apellido <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                {...register("surname", { required: "El apellido es obligatorio" })}
                            />
                            {errors.surname && (
                                <p className="text-red-500 text-xs mt-1">{errors.surname.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className={inputClass}
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Formato de correo inválido",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Rol <span className="text-red-500">*</span>
                        </label>
                        <select
                            className={inputClass}
                            {...register("role", { required: "El rol es obligatorio" })}
                        >
                            <option value="Client">Client</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                        )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleDeactivate}
                            disabled={loading}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition text-sm font-medium disabled:opacity-50"
                        >
                            Inactivar usuario
                        </button>

                        <div className="flex flex-col-reverse sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow disabled:opacity-60"
                                style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                            >
                                {loading ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
