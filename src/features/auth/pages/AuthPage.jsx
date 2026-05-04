import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        /* FONDO COMPLETO: Un gradiente que elimina el blanco total */
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-400 to-teal-500 p-4">
            
            {/* Luces decorativas para dar profundidad al fondo */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-white/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-black/10 rounded-full blur-[120px]"></div>
            </div>

            {/* EL CUADRO: Ahora está remarcado con sombra y borde blanco sólido */}
            <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-4 border-white/50 p-8 md:p-12 transition-all">
                
                {/* Logo con sombra para que no se pierda */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <img
                            src="/src/assets/img/bancoLogo.png"
                            alt="Sistema Bancario"
                            className="h-20 w-auto object-contain"
                        />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                        {isForgot ? "Recuperar Contraseña" : "Bienvenido de Nuevo"}
                    </h1>
                    <p className="text-gray-600 font-medium">
                        {isForgot
                            ? "Ingresa tu correo para continuar"
                            : "Administración del Sistema Bancario"}
                    </p>
                </div>

                {/* Contenedor del Formulario */}
                <div className="bg-gray-50/50 p-2 rounded-2xl">
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