export const ForgotPasswordForm = ({ onSwitch }) => {
    return (
        <form className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.1em] mb-1.5 ml-1">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    /* Bordes rectos y foco en color vino sólido */
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-none bg-slate-100/50 focus:ring-2 focus:ring-[#4a0404]/10 focus:border-[#4a0404] outline-none transition-all duration-200 mb-5 text-slate-700"
                />
                <button
                    type="submit"
                    /* Diseño unificado: Redondeado 2xl, Gradiente y efectos de movimiento */
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-[#4a0404] to-[#720e0e] text-white font-black py-4 rounded-2xl shadow-xl shadow-red-900/10 hover:shadow-red-900/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-sm">
                        Enviar correo
                    </span>

                    {/* Efecto de brillo al pasar el mouse (shimmer) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
            </div>

            <p className="text-center text-sm text-gray-600 font-medium">
                ¿Recordaste tu contraseña?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    /* Texto en color vino para coherencia */
                    className="text-[#4a0404] font-bold hover:underline transition-all"
                >
                    Iniciar sesión
                </button>
            </p>
        </form>
    );
};