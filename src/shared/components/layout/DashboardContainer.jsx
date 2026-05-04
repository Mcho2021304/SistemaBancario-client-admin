import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import imgLogo from "../../../assets/img/bancoLogo.png";
 
export const DashboardContainer = () => {
  const location = useLocation();
 
  const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";
 
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-green-200 via-slate-50 to-emerald-200">
  
  {/* Capa de diseño: Blobs de color fijos que bañan toda la pantalla */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-300/30 rounded-full blur-[120px]"></div>
    <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-white/40 rounded-full blur-[80px]"></div>
  </div>

  {/* Contenido sobre el fondo */}
  <div className="relative z-10 flex flex-col min-h-screen">
    <Navbar className="bg-white/10 backdrop-blur-md border-b border-white/20" />

    <div className="flex flex-1">
      {/* Sidebar con fondo traslúcido para que se vea el color de fondo */}
      <Sidebar className="bg-white/5 backdrop-blur-sm border-r border-white/10" />

      <main className="flex-1 p-6">
        {isDashboardRoot ? (
          <div className="text-center h-full flex flex-col items-center justify-center animate-fade-in">
            
            {/* Logo con resplandor */}
            <div className="relative group mb-8">
              <div className="absolute -inset-6 bg-white/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <img
                src={imgLogo}
                alt="Gestor Logo"
                className="relative h-40 md:h-56 w-auto object-contain mx-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Texto de alto contraste */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-900 via-green-700 to-emerald-800">
                ¡Bienvenido a Banco Kinalitos Admin!
              </span>
            </h1>

            <div className="max-w-xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-gray-800 font-bold leading-relaxed">
                Plataforma de Gestión Integral
              </p>
              <p className="text-green-900/70 text-lg font-medium">
                Selecciona una opción del menú lateral para administrar tus recursos.
              </p>
            </div>

            {/* Decoración: Barra de progreso decorativa */}
            <div className="mt-12 w-48 h-2.5 bg-white/30 rounded-full overflow-hidden p-0.5 border border-white/50 shadow-inner">
              <div className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full w-full shadow-lg shadow-green-500/50"></div>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  </div>
</div>
  );
}
 