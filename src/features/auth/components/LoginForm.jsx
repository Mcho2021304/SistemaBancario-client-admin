import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSumnit = async (data) => {
        const res = await login(data);
        if (res) {
            navigate("/dashboard");
            toast.success("¡Bienvenido de nuevo!");
        } else {
            toast.error("Credenciales incorrectas");
        }
    };

return (
    <form onSubmit={handleSubmit(onSumnit)} className="space-y-6">
        {/* Sección de Email o Usuario */}
        <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">
                Email o Usuario
            </label>
            <input
                type="text"
                placeholder="ejemplo@kinalitos.com"
                /* CAMBIO: Focus ahora usa un tono vino suave en lugar de verde */
                className={`w-full px-4 py-3.5 bg-slate-100/50 border ${
                    errors.emailOrUsername ? 'border-red-300' : 'border-slate-200'
                } rounded-2xl focus:ring-4 focus:ring-red-900/5 focus:border-[#4a0404] focus:bg-white outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-700`}
                {...register("emailOrUsername", { required: "Este campo es obligatorio" })}
            />
            {errors.emailOrUsername && (
                <span className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.emailOrUsername.message}</span>
            )}
        </div>

        {/* Sección de Contraseña */}
        <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">
                Contraseña
            </label>
            <input
                type="password"
                placeholder="••••••••"
                /* CAMBIO: Focus coherente con la paleta corinto */
                className={`w-full px-4 py-3.5 bg-slate-100/50 border ${
                    errors.password ? 'border-red-300' : 'border-slate-200'
                } rounded-2xl focus:ring-4 focus:ring-red-900/5 focus:border-[#4a0404] focus:bg-white outline-none transition-all duration-200 text-slate-700`}
                {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
                <span className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.password.message}</span>
            )}
        </div>

        {/* Botón de Olvido de contraseña */}
        <div className="flex justify-center">
            <button
                type="button"
                onClick={onForgot}
                /* CAMBIO: Color de texto a un vino sutil para mantener sobriedad */
                className="text-sm font-bold text-[#630d0d] hover:text-[#4a0404] transition-colors"
            >
                ¿Olvidaste tu contraseña?
            </button>
        </div>

        {/* Botón de Iniciar Sesión */}
        <button
            type="submit"
            disabled={loading}
            /* CAMBIO: Gradiente de Vino a Corinto. Sombra ajustada a tonos cálidos/neutros */
            className="w-full relative group overflow-hidden bg-gradient-to-r from-[#4a0404] to-[#720e0e] text-white font-black py-4 rounded-2xl shadow-xl shadow-red-900/10 hover:shadow-red-900/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verificando...
                    </>
                ) : (
                    "INICIAR SESIÓN"
                )}
            </span>
            {/* Efecto de brillo al pasar el mouse (shimmer) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
    </form>
    );
};