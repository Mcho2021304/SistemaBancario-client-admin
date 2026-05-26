import { useEffect } from "react";
import { AppRoutes } from "./router/AppRoutes";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../features/auth/store/authStore";

function App() {
  const { isLoadingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    // Verificar autenticación al cargar la aplicación
    checkAuth();
  }, []);

  // Mientras se verifica la autenticación, mostrar pantalla de carga
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-blue mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Inicializando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "8px",
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;
