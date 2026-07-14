import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsersStore } from "../store/usersStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

const inputClass =
    "w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-[#631616] focus:ring-2 focus:ring-[#631616]/20 transition";

export const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
    const { createUser, loading } = useUsersStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            role: "Client",
            accountType: "Ahorro",
        },
    });

    useEffect(() => {
        if (isOpen) reset();
    }, [isOpen, reset]);

    const onSubmit = async (data) => {
        try {
            await createUser(data);
            showSuccess("Usuario creado correctamente");
            if (onUserCreated) onUserCreated();
            onClose();
        } catch (error) {
            showError(error.response?.data?.message || "Error al crear usuario");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{ background: "linear-gradient(90deg, var(--main-red, #631616) 0%, #470f0f 100%)" }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">Nuevo Usuario</h2>
                    <p className="text-xs sm:text-sm opacity-80">
                        Completa la información para registrar un nuevo usuario
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 sm:p-6 space-y-4 overflow-y-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Ej. Juan"
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
                                placeholder="Ej. Pérez"
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
                            placeholder="correo@ejemplo.com"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Tipo de cuenta <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={inputClass}
                                {...register("accountType", { required: "El tipo de cuenta es obligatorio" })}
                            >
                                <option value="Ahorro">Ahorro</option>
                                <option value="Monetaria">Monetaria</option>
                            </select>
                            {errors.accountType && (
                                <p className="text-red-500 text-xs mt-1">{errors.accountType.message}</p>
                            )}
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-red-600 hover:bg-gray-200 hover:border-red-600 hover:border transition disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow disabled:opacity-60"
                            style={{ background: "linear-gradient(90deg, var(--main-red, #631616) 0%, #470f0f 100%)" }}
                        >
                            {loading ? "Creando..." : "Crear usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
