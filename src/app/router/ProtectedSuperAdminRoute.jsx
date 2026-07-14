import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore.js";

export const ProtectedSuperAdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) return <Navigate to="/" replace />;

    const isSuperAdmin = user?.role === "SUPERADMIN_ROLE" || user?.email === "admin@SistemaBancario.local";
    
    if (!isSuperAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};
