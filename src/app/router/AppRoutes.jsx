import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { Deposits } from "../../features/deposits/components/Deposits.jsx";
import { Users } from "../../features/users/components/Users.jsx";
import { Accounts } from "../../features/accounts/components/Accounts.jsx";
import { Cards } from "../../features/cards/components/Cards.jsx";
import { Transactions } from "../../features/transactions/components/Transactions.jsx";
import { Shoppings } from "../../features/shoppings/components/Shoppings.jsx";
import { Products } from "../../features/products/components/Products.jsx";
import { Services } from "../../features/services/components/Services.jsx";
import { Passbooks } from "../../features/passbooks/components/Passbooks.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { ProtectedSuperAdminRoute } from "./ProtectedSuperAdminRoute.jsx";
import { SuperAdminPanel } from "../../features/superadmin/components/SuperAdminPanel.jsx";

export const AppRoutes = () => {
  return (
    <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* PUBLIC */}
      <Route path="/" element={<AuthPage />} />

      {/* PROTECTED + ROLE */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route path="deposits" element={<Deposits />} />
        <Route path="users" element={<Users />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="cards" element={<Cards />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="shoppings" element={<Shoppings />} />
        <Route path="passbooks" element={<Passbooks />} />
        <Route 
          path="superadmin" 
          element={
            <ProtectedSuperAdminRoute>
              <SuperAdminPanel />
            </ProtectedSuperAdminRoute>
          } 
        />
      </Route>

      {/* Ruta temporal para pruebas */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};