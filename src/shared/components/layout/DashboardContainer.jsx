import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import imgLogo from "../../../assets/img/bancoLogo.png";
 
export const DashboardContainer = () => {
  const location = useLocation();
 
  const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";
 
 return (
  /* FONDO COMPLETO: Ahora en un tono neutro muy elegante que permite resaltar el color vino */
  <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
  
  {/* Capa de diseño: Blobs de color vino fijos (muy tenues) para dar profundidad sin distraer */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4a0404]/5 rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4a0404]/10 rounded-full blur-[120px]"></div>
  </div>

  {/* Contenido sobre el fondo */}
  <div className="relative z-10 flex flex-col min-h-screen">
    {/* Navbar: Ahora con borde en color vino tenue */}
    <Navbar className="bg-white border-b border-[#4a0404]/10 shadow-sm" />

    <div className="flex flex-1">
      {/* Sidebar: Fondo sólido o muy levemente gris para transmitir orden */}
      <Sidebar className="bg-white border-r border-slate-200" />

      <main className="flex-1 p-6">
        {isDashboardRoot ? (
          <div className="text-center h-full flex flex-col items-center justify-center animate-fade-in">
            
            {/* Logo con resplandor sutil en tono vino */}
            <div className="relative group mb-8">
              <div className="absolute -inset-6 bg-[#4a0404]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <img
                src={imgLogo}
                alt="Gestor Logo"
                className="relative h-40 md:h-56 w-auto object-contain mx-auto drop-shadow-[0_20px_20px_rgba(74,4,4,0.1)]"
              />
            </div>

            {/* Texto de alto contraste: Títulos en color Vino/Corinto sólido */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="text-[#4a0404]">
                ¡Bienvenido a Banco Kinalitos Admin!
              </span>
            </h1>

            <div className="max-w-xl mx-auto space-y-4">
              <p className="text-[#4a0404]/60 text-lg font-medium">
                Selecciona una opción del menú lateral para administrar tus recursos con seguridad.
              </p>
            </div>

            {/* Decoración: Barra de progreso en color vino sólido */}
            <div className="mt-12 w-48 h-2 bg-slate-200 rounded-none overflow-hidden border border-slate-300">
              <div className="h-full bg-[#4a0404] w-full"></div>
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
 