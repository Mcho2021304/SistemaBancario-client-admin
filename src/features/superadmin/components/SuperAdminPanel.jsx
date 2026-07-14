import { useAuthStore } from "../../auth/store/authStore.js";

export const SuperAdminPanel = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-[#4a0404] mb-4">Panel SuperAdmin / Configuración Global</h2>
      <p className="text-gray-600 mb-6">
        Bienvenido, {user?.name || "Super Administrador"}. Tienes acceso exclusivo a esta sección por ser el administrador principal.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for SuperAdmin features */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:shadow-md transition">
          <h3 className="text-[#631616] font-semibold mb-2">Auditoría Global</h3>
          <p className="text-sm text-gray-500">Visualiza los logs del sistema y las acciones de otros administradores.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:shadow-md transition">
          <h3 className="text-[#631616] font-semibold mb-2">Configuración del Sistema</h3>
          <p className="text-sm text-gray-500">Ajusta variables globales, límites de transferencias y políticas del banco.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:shadow-md transition">
          <h3 className="text-[#631616] font-semibold mb-2">Gestión de Backups</h3>
          <p className="text-sm text-gray-500">Administra las copias de seguridad de la base de datos principal.</p>
        </div>
      </div>
    </div>
  );
};
