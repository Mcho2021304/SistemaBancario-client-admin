import { useState, useEffect } from "react";
import { useDepositsStore } from "../store/depositsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const DepositsModal = ({ isOpen, onClose, deposit = null }) => {
    const { createDeposit, loading } = useDepositsStore();

    const [formData, setFormData] = useState({
        senderAccount: "",
        accountNumber: "",
        amount: "",
        method: "Efectivo",
        description: "Depósito administrativo",
        status: "Completado",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (deposit) {
            setFormData({
                senderAccount: deposit.senderAccount || "",
                accountNumber: deposit.accountNumber || "",
                amount: deposit.amount || "",
                method: deposit.method || "Efectivo",
                description: deposit.description || "Depósito administrativo",
                status: deposit.status || "Completado",
            });
        } else {
            setFormData({
                senderAccount: "",
                accountNumber: "",
                amount: "",
                method: "Efectivo",
                description: "Depósito administrativo",
                status: "Completado",
            });
        }
        setErrors({});
    }, [deposit, isOpen]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.senderAccount.trim()) {
            newErrors.senderAccount = "La cuenta de origen es obligatoria";
        }

        if (!formData.accountNumber.trim()) {
            newErrors.accountNumber = "La cuenta destino es obligatoria";
        }

        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = "El monto debe ser mayor a 0";
        }

        if (!formData.method) {
            newErrors.method = "El método es obligatorio";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) || "" : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createDeposit(formData);
            showSuccess(`Depósito ${deposit ? "actualizado" : "creado"} correctamente`);
            onClose();
        } catch (error) {
            showError(error.response?.data?.message || "Error al guardar el depósito");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            {/* CONTENEDOR */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{
                        background:
                            "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)",
                    }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">
                        {deposit ? "Editar Depósito" : "Nuevo Depósito"}
                    </h2>
                    <p className="text-xs sm:text-sm opacity-80">
                        Completa la información del depósito
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Cuenta Origen */}
                        <div className="flex flex-col md:col-span-1">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                Cuenta Origen *
                            </label>
                            <input
                                type="text"
                                name="senderAccount"
                                value={formData.senderAccount}
                                onChange={handleChange}
                                disabled={!!deposit}
                                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm 
                                focus:outline-none focus:ring-2 transition ${
                                    errors.senderAccount
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                                } ${deposit ? "opacity-50 cursor-not-allowed" : ""}`}
                                placeholder="Ej. 000-1234-5"
                            />
                            {errors.senderAccount && (
                                <p className="text-red-500 text-xs mt-1">{errors.senderAccount}</p>
                            )}
                        </div>

                        {/* Cuenta Destino */}
                        <div className="flex flex-col md:col-span-1">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                Cuenta Destino *
                            </label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                disabled={!!deposit}
                                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm 
                                focus:outline-none focus:ring-2 transition ${
                                    errors.accountNumber
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                                } ${deposit ? "opacity-50 cursor-not-allowed" : ""}`}
                                placeholder="Ej. 000-4562-1"
                            />
                            {errors.accountNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
                            )}
                        </div>

                        {/* Monto */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                Monto (Q) *
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                step="0.01"
                                min="0.01"
                                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm 
                                focus:outline-none focus:ring-2 transition ${
                                    errors.amount
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                                }`}
                                placeholder="1,250.00"
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                            )}
                        </div>

                        {/* Método */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                Método *
                            </label>
                            <select
                                name="method"
                                value={formData.method}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm 
                                focus:outline-none focus:ring-2 transition ${
                                    errors.method
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:border-[#631616] focus:ring-[#631616]/20"
                                }`}
                            >
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                            {errors.method && (
                                <p className="text-red-500 text-xs mt-1">{errors.method}</p>
                            )}
                        </div>

                        {/* Estado */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                Estado
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
                                focus:outline-none focus:border-[#631616] focus:ring-2 focus:ring-[#631616]/20 transition"
                            >
                                <option value="Completado">Completado</option>
                                <option value="Anulado">Anulado</option>
                            </select>
                        </div>

                        {/* Descripción */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm 
                                focus:outline-none focus:border-[#631616] focus:ring-2 focus:ring-[#631616]/20 transition"
                                placeholder="Detalles del depósito..."
                            />
                        </div>
                    </div>

                    {/* BOTONES */}
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
                                background:
                                    "linear-gradient(90deg, var(--main-blue) 0%, #470f0f 100%)",
                                border: "none",
                            }}
                        >
                            {loading ? "Guardando..." : deposit ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};