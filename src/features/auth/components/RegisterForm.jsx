import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { register as registerApi } from "../../../shared/api/auth";

export const RegisterForm = ({ onSwitch }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("Name", data.name);
            formData.append("Surname", data.surname);
            formData.append("Username", data.username);
            formData.append("Email", data.email);
            formData.append("Password", data.password);
            formData.append("Phone", data.phone);

            await registerApi(formData);
            toast.success("¡Registro exitoso! Espera la asignación de rol administrador.");
            onSwitch(); // Volver al login
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Error al registrarse. Intenta de nuevo.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                        Nombres
                    </label>
                    <input
                        type="text"
                        placeholder="Tus nombres"
                        {...register("name", { required: "Requerido" })}
                        className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none shadow-sm ${
                            errors.name ? "border-[#631616] bg-red-50" : "border-slate-300 focus:border-[#631616]"
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        placeholder="Tus apellidos"
                        {...register("surname", { required: "Requerido" })}
                        className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none shadow-sm ${
                            errors.surname ? "border-[#631616] bg-red-50" : "border-slate-300 focus:border-[#631616]"
                        }`}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                    Usuario
                </label>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    {...register("username", { required: "Requerido" })}
                    className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none shadow-sm ${
                        errors.username ? "border-[#631616] bg-red-50" : "border-slate-300 focus:border-[#631616]"
                    }`}
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register("email", { 
                        required: "Requerido",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" }
                    })}
                    className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none shadow-sm ${
                        errors.email ? "border-[#631616] bg-red-50" : "border-slate-300 focus:border-[#631616]"
                    }`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        placeholder="Ej. 12345678"
                        {...register("phone", { 
                            required: "Requerido",
                            minLength: { value: 8, message: "Mín. 8 caracteres" }
                        })}
                        className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none shadow-sm ${
                            errors.phone ? "border-[#631616] bg-red-50" : "border-slate-300 focus:border-[#631616]"
                        }`}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="******"
                        {...register("password", { 
                            required: "Requerido",
                            minLength: { value: 6, message: "Mín. 6 caracteres" }
                        })}
                        className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none shadow-sm ${
                            errors.password ? "border-[#631616] bg-red-50" : "border-slate-300 focus:border-[#631616]"
                        }`}
                    />
                </div>
            </div>

            <div className="flex justify-start pt-1">
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-xs text-[#2C3E50] hover:text-[#631616] font-bold transition-colors duration-150 hover:underline"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </button>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-md font-bold text-white text-sm tracking-wide uppercase
                    bg-[#631616]
                    hover:bg-[#4a0404]
                    focus:outline-none focus:ring-2 focus:ring-[#631616]/40
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200 shadow-sm hover:shadow-md"
            >
                {isLoading ? "Registrando..." : "Crear Cuenta"}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
                Nota: Tu cuenta tendrá rol de cliente inicialmente.
            </p>
        </form>
    );
};
