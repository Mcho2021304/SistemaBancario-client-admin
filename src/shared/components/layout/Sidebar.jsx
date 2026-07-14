import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
 
export const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuthStore();
    
    const isSuperAdmin = user?.role === "SUPERADMIN_ROLE" || user?.email === "admin@SistemaBancario.local";
 
    const items = [
        { label: "Usuarios", to: "/dashboard/users" },
        { label: "Depositos", to: "/dashboard/deposits" },
        { label: "Cuentas", to: "/dashboard/accounts" },
        { label: "Transacciones", to: "/dashboard/transactions" },
        { label: "Libreta", to: "/dashboard/passbooks" },
        { label: "Compras", to: "/dashboard/shoppings" },
        { label: "Productos", to: "/dashboard/products" },
        { label: "Servicios", to: "/dashboard/services" },
        { label: "Tarjetas", to: "/dashboard/cards" }
    ];
 
    if (isSuperAdmin) {
        items.push({ label: "Configuración Global", to: "/dashboard/superadmin" });
    }

    return (
        /* Fondo Pizarra Oscuro (#2C3E50) para un look técnico */
        <aside className="w-60 bg-[#2C3E50] min-h-[calc(100vh-4rem)] p-4 shadow-xl">
            <ul className="space-y-1.5">
                {items.map((item) => {
                    const active = location.pathname === item.to;

                    return (
                        <li key={item.label}>
                            <Link
                                to={item.to}
                                className={`
                                    block px-4 py-2.5 rounded-md font-medium transition-all duration-300
                                    ${active
                                        ? "bg-[#631616] text-white ring-1 ring-[#A68542]/50"
                                        : "text-gray-300 hover:bg-[#34495E] hover:text-white"
                                    }
                                `}
                                style={active ? { fontWeight: 700 } : {}}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Indicador lateral de color ocre */}
                                    {active && <div className="w-1 h-4 bg-[#A68542] rounded-full"></div>}
                                    {item.label}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};
 