import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        /* FONDO COMPLETO: Color vino sólido para máxima sobriedad y elegancia */
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#4a0404] p-4">

            {/* Eliminamos las luces decorativas y efectos de pulso para un diseño más limpio */}

            {/* EL CUADRO: Mantenemos el contraste sólido. 
            He quitado el backdrop-blur ya que el fondo ahora es plano. */}
            <div className="relative z-10 w-full max-w-xl bg-white rounded-none shadow-2xl border border-gray-200 p-8 md:p-12 transition-all">

                {/* Logo con diseño limpio */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100">
                        <img
                            src="/src/assets/img/bancoLogo.png"
                            alt="Sistema Bancario"
                            className="h-20 w-auto object-contain"
                        />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-black text-[#0f2449] mb-2">
                        {isForgot ? "Recuperar Contraseña" : "Bienvenido de Nuevo"}
                    </h1>
                    <p className="text-[#0f2449] opacity-80 font-medium">
                        {isForgot
                            ? "Ingresa tu correo para continuar"
                            : "Administración del Sistema Bancario"}
                    </p>
                </div>

                {/* Contenedor del Formulario - Adaptado a bordes rectos para consistencia */}
                <div className="bg-gray-50 p-2 rounded-none">
                    {isForgot ? (
                        <ForgotPasswordForm
                            onSwitch={() => setIsForgot(false)}
                        />
                    ) : (
                        <LoginForm onForgot={() => setIsForgot(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export { AuthPage };