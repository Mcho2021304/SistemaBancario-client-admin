import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { Deposits } from "../../features/deposits/components/Deposits.jsx";
import { Payments } from "../../features/payments/components/Payments.jsx";
import { Services } from "../../features/services/components/Services.jsx";
import { Tournaments } from "../../features/tournaments/components/Tournaments.jsx";
import { Users } from "../../features/users/components/Users.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AuthPage />} />

      {/* PROTECTED + ROLE */}
      <Route path="/dashboard/*" element={<DashboardPage />}>
        <Route path="deposits" element={<Deposits />} />
        <Route path="payments" element={<Payments />} />
        <Route path="services" element={<Services />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* Ruta temporal para pruebas */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};