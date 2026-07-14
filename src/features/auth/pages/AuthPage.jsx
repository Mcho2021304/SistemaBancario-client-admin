import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RegisterForm } from "../components/RegisterForm";

const AuthPage = () => {
    const [view, setView] = useState("login"); // "login", "forgot", "register"

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#4a0404] p-4">
            <div className="relative z-10 w-full max-w-xl bg-white rounded-none shadow-2xl border border-gray-200 p-8 md:p-12 transition-all">

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
                        {view === "forgot" && "Recuperar Contraseña"}
                        {view === "register" && "Registro de Administrador"}
                        {view === "login" && "Bienvenido de Nuevo"}
                    </h1>
                    <p className="text-[#0f2449] opacity-80 font-medium">
                        {view === "forgot" && "Ingresa tu correo para continuar"}
                        {view === "register" && "Solicitud de acceso al panel"}
                        {view === "login" && "Administración del Sistema Bancario"}
                    </p>
                </div>

                <div className="bg-gray-50 p-2 rounded-none">
                    {view === "forgot" && <ForgotPasswordForm onSwitch={() => setView("login")} />}
                    {view === "register" && <RegisterForm onSwitch={() => setView("login")} />}
                    {view === "login" && <LoginForm onForgot={() => setView("forgot")} onRegister={() => setView("register")} />}
                </div>
            </div>
        </div>
    );
};

export { AuthPage };