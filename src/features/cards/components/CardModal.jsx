import { useState } from "react";
import { useCardsStore } from "../store/cardsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const CardModal = ({ isOpen, onClose }) => {
  const { createCard, loading } = useCardsStore();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    expirationDate: "",
    status: "Activa",
    accountNumber: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "El número de tarjeta es obligatorio";
    if (!formData.cvv.trim()) newErrors.cvv = "El CVV es obligatorio";
    if (!formData.expirationDate.trim()) newErrors.expirationDate = "La fecha de expiración es obligatoria";
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "El número de cuenta es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createCard(formData);
      showSuccess("Tarjeta creada correctamente");
      onClose();
      setFormData({ cardNumber: "", cvv: "", expirationDate: "", status: "Activa", accountNumber: "" });
    } catch (error) {
      showError(error.response?.data?.message || "Error al crear tarjeta");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="p-4 sm:p-5 text-white sticky top-0 z-10" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
          <h2 className="text-xl sm:text-2xl font-bold">Nueva Tarjeta</h2>
          <p className="text-xs sm:text-sm opacity-80">Emite una tarjeta vinculada a una cuenta existente.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Número de tarjeta *</label>
              <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.cardNumber ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                placeholder="0000 0000 0000 0000"
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">CVV *</label>
              <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.cvv ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Expiración *</label>
              <input
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.expirationDate ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                placeholder="MM/AA"
              />
              {errors.expirationDate && <p className="text-red-500 text-xs mt-1">{errors.expirationDate}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Cuenta vinculada *</label>
              <input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${errors.accountNumber ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                placeholder="000-4562-1"
              />
              {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
                <option value="Bloqueada">Bloqueada</option>
              </select>
            </div>
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
              {loading ? "Guardando..." : "Crear tarjeta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};