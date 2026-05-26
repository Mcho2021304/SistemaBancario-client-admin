import { useState, useEffect } from "react";
import { useShoppingsStore } from "../store/shoppingsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const ShoppingModal = ({ isOpen, onClose, shopping = null }) => {
  const { createShopping, loading } = useShoppingsStore();
  const [formData, setFormData] = useState({
    userId: "",
    accountNumber: "",
    amount: "",
    description: "",
    status: "Completado",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (shopping) {
      setFormData({
        userId: shopping.userId || "",
        accountNumber: shopping.accountNumber || "",
        amount: shopping.amount ?? "",
        description: shopping.description || "",
        status: shopping.status || "Completado",
      });
    } else {
      setFormData({
        userId: "",
        accountNumber: "",
        amount: "",
        description: "",
        status: "Completado",
      });
    }
    setErrors({});
  }, [shopping, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userId.trim()) newErrors.userId = "El ID de usuario es obligatorio";
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "El número de cuenta es obligatorio";
    if (formData.amount === "" || Number(formData.amount) <= 0) newErrors.amount = "El monto debe ser mayor a 0";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? "" : Number(value)) : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await createShopping({
        userId: formData.userId,
        accountNumber: formData.accountNumber,
        amount: Number(formData.amount),
        description: formData.description,
        status: formData.status,
      });
      showSuccess("Compra creada correctamente");
      onClose();
    } catch (error) {
      showError(error.response?.data?.message || "Error al crear compra");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-4 sm:p-5 text-white sticky top-0 z-10" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
          <h2 className="text-xl sm:text-2xl font-bold">{shopping ? "Detalle de Compra" : "Nueva Compra"}</h2>
          <p className="text-xs sm:text-sm opacity-80">{shopping ? "Revisa la información de la compra." : "Completa la información de la compra."}</p>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {shopping ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Usuario</p>
                <p className="mt-1 text-gray-800 font-semibold">{shopping.userId || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Cuenta</p>
                <p className="mt-1 text-gray-800 font-semibold">{shopping.accountNumber || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Monto</p>
                <p className="mt-1 text-green-700 font-semibold">{new Intl.NumberFormat("es-GT", { style: "currency", currency: "GTQ" }).format(shopping.amount || 0)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Estado</p>
                <p className="mt-1 text-gray-800 font-semibold">{shopping.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Descripción</p>
                <p className="mt-1 text-gray-700">{shopping.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Fecha</p>
                <p className="mt-1 text-gray-700">{new Date(shopping.date).toLocaleString("es-GT")}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">ID de usuario *</label>
                <input
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.userId ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                  placeholder="Ej. 6424f3d0a1b2c3d4"
                />
                {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Número de cuenta *</label>
                <input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.accountNumber ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                  placeholder="Ej. 000-4562-1"
                />
                {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Monto (Q) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.amount ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                  placeholder="100.00"
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="Completado">Completado</option>
                  <option value="Anulado">Anulado</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1">Descripción *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.description ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                  placeholder="Ej. Compra de insumos para cliente"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)", border: "none" }}
                >
                  {loading ? "Guardando..." : "Crear compra"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};