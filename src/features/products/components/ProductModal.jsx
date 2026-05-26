import { useState, useEffect } from "react";
import { useProductsStore } from "../store/productsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const ProductModal = ({ isOpen, onClose, editingProduct }) => {
  const { createProduct, updateProduct, loading } = useProductsStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    rate: "",
    status: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        type: editingProduct.type || "",
        rate: editingProduct.rate || "",
        status: editingProduct.status ?? true,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        type: "",
        rate: "",
        status: true,
      });
    }
    setErrors({});
  }, [editingProduct, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!formData.type.trim()) newErrors.type = "El tipo es obligatorio";
    if (!formData.rate || parseFloat(formData.rate) < 0) newErrors.rate = "La tasa debe ser un número positivo";
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
      const payload = {
        ...formData,
        rate: parseFloat(formData.rate),
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id || editingProduct.id, payload);
        showSuccess("Producto actualizado correctamente");
      } else {
        await createProduct(payload);
        showSuccess("Producto creado correctamente");
      }

      onClose();
    } catch (error) {
      showError(error.response?.data?.message || "Error al guardar producto");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="p-4 sm:p-5 text-white sticky top-0 z-10" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
          <h2 className="text-xl sm:text-2xl font-bold">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
          <p className="text-xs sm:text-sm opacity-80">
            {editingProduct ? "Actualiza los datos del producto." : "Crea un nuevo producto con sus características."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              placeholder="Ej: Cuenta de Ahorros"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Descripción *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                errors.description ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              placeholder="Describe el producto..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Tipo *</label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                  errors.type ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
                placeholder="Ej: Ahorros"
              />
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Tasa (%) *</label>
              <input
                name="rate"
                type="number"
                step="0.01"
                min="0"
                value={formData.rate}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 transition ${
                  errors.rate ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
                placeholder="3.5"
              />
              {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <input
              name="status"
              type="checkbox"
              checked={formData.status}
              onChange={handleChange}
              className="w-4 h-4 rounded border-2 border-gray-300 cursor-pointer accent-blue-500"
            />
            <label className="text-sm font-medium text-gray-700 cursor-pointer">Producto Activo</label>
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
              {loading ? "Guardando..." : editingProduct ? "Actualizar" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
