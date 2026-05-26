import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) return <Navigate to="/" replace />;

    const role = user?.role;
    if (role !== "ADMIN_ROLE" && role !== "ADMIN" && role !== "Administrador") {
        return <Navigate to="/" replace />;
    }

    return children;
};
