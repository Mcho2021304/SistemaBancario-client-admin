import { useState, useEffect } from "react";
import { useAccountsStore } from "../store/accountsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const AccountModal = ({ isOpen, onClose, account = null }) => {
  const { addExtraAccount, updateAccount, loading } = useAccountsStore();
  const [formData, setFormData] = useState({
    accountNumber: "",
    userId: "",
    balance: "",
    accountType: "Monetaria",
    status: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (account) {
      setFormData({
        accountNumber: account.accountNumber || "",
        userId: account.userId || "",
        balance: account.balance ?? "",
        accountType: account.accountType || "Monetaria",
        status: account.status ?? true,
      });
    } else {
      setFormData({
        accountNumber: "",
        userId: "",
        balance: "",
        accountType: "Monetaria",
        status: true,
      });
    }
    setErrors({});
  }, [account, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "El número de cuenta es obligatorio";
    }
    if (!formData.userId.trim()) {
      newErrors.userId = "El ID de usuario es obligatorio";
    }
    if (formData.balance === "" || Number(formData.balance) < 0) {
      newErrors.balance = "El saldo debe ser 0 o mayor";
    }
    if (!formData.accountType) {
      newErrors.accountType = "El tipo de cuenta es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "balance"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (account) {
        await updateAccount(account._id, {
          userId: formData.userId,
          balance: Number(formData.balance),
          accountType: formData.accountType,
          status: formData.status,
        });
        showSuccess("Cuenta actualizada correctamente");
      } else {
        await addExtraAccount({
          accountNumber: formData.accountNumber,
          userId: formData.userId,
          balance: Number(formData.balance),
          accountType: formData.accountType,
          status: formData.status,
        });
        showSuccess("Cuenta creada correctamente");
      }
      onClose();
    } catch (error) {
      showError(error.response?.data?.message || "Error al guardar la cuenta");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{
            background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {account ? "Editar Cuenta" : "Nueva Cuenta"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información de la cuenta bancaria.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Número de cuenta *</label>
              <input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                disabled={!!account}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                  errors.accountNumber
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                } ${account ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="Ej. 000-4562-1"
              />
              {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">ID de usuario *</label>
              <input
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                  errors.userId
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                }`}
                placeholder="Ej. 6424f3d0a1b2c3d4"
              />
              {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Saldo *</label>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                  errors.balance
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                }`}
                placeholder="0.00"
              />
              {errors.balance && <p className="text-red-500 text-xs mt-1">{errors.balance}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Tipo de cuenta *</label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                  errors.accountType
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                }`}
              >
                <option value="Monetaria">Monetaria</option>
                <option value="Ahorro">Ahorro</option>
              </select>
              {errors.accountType && <p className="text-red-500 text-xs mt-1">{errors.accountType}</p>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value={true}
                    checked={formData.status === true}
                    onChange={() => setFormData((prev) => ({ ...prev, status: true }))}
                    className="form-radio text-main-blue"
                  />
                  Activo
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value={false}
                    checked={formData.status === false}
                    onChange={() => setFormData((prev) => ({ ...prev, status: false }))}
                    className="form-radio text-main-blue"
                  />
                  Inactivo
                </label>
              </div>
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
              style={{
                background: "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)",
                border: "none",
              }}
            >
              {loading ? "Guardando..." : account ? "Actualizar cuenta" : "Crear cuenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
