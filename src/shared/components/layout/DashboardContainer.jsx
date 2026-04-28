import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import imgLogo from "../../../assets/img/bancoLogo.png";
 
export const DashboardContainer = () => {
  const location = useLocation();
 
  const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";
 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">  
 
      <Navbar />
 
      <div className="flex flex-1">
        <Sidebar />
       
        <main className="flex-1 p-6">      
        {isDashboardRoot ? (
          <div className="text-center h-full flex flex-col items-center justify-center ">
              <img
                          src={imgLogo}
                          alt="Gestor Logo"
                          className="h-40 md:h-50 w-auto object-contain mx-auto mb-6"
                        />
              <h1 className="text-5xl font-extrabold text-green-80000 mb-4">¡Bienvenido a Banco Kinalitos Admin!</h1>
              <p className="text-gray-600 mt-2">Selecciona una opción del menú para comenzar.</p>
            </div>
        ):(<Outlet />
          )}  
        </main>
      </div>
    </div>
  );
}
 