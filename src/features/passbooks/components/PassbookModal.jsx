import { useState } from "react";
import { usePassbooksStore } from "../store/passbooksStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const PassbookModal = ({ isOpen, onClose }) => {
  const { createPassbook, loading } = usePassbooksStore();
  const [formData, setFormData] = useState({
    userId: "",
    accountNumber: "",
    description: "Libreta de ahorros",
    status: true,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.userId.trim()) newErrors.userId = "El ID de usuario es obligatorio";
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "El número de cuenta es obligatorio";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createPassbook(formData);
      showSuccess("Libreta creada correctamente");
      onClose();
      setFormData({
        userId: "",
        accountNumber: "",
        description: "Libreta de ahorros",
        status: true,
      });
    } catch (error) {
      showError(error.response?.data?.message || "Error al crear libreta");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="p-4 sm:p-5 text-white sticky top-0 z-10" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)" }}>
          <h2 className="text-xl sm:text-2xl font-bold">Nueva Libreta</h2>
          <p className="text-xs sm:text-sm opacity-80">Emite una nueva libreta de ahorros a un cliente.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">ID de Usuario *</label>
            <input
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                errors.userId ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
              }`}
              placeholder="ID del usuario"
            />
            {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Número de Cuenta *</label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                errors.accountNumber ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
              }`}
              placeholder="000-4562-1"
            />
            {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Descripción *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                errors.description ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
              }`}
              placeholder="Descripción de la libreta"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <input
              name="status"
              type="checkbox"
              checked={formData.status}
              onChange={handleChange}
              className="w-4 h-4 rounded border-2 border-gray-300 cursor-pointer accent-blue-500"
            />
            <label className="text-sm font-medium text-gray-700 cursor-pointer">Libreta Activa</label>
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
              style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)", border: "none" }}
            >
              {loading ? "Guardando..." : "Crear Libreta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};