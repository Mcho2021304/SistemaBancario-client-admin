import { create } from "zustand";
import {
    getProducts as getProductsRequest,
    createProduct as createProductRequest,
    updateProduct as updateProductRequest,
    deleteProduct as deleteProductRequest,
} from "../../../shared/api";

export const useProductsStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    getProducts: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getProductsRequest();
            const data = response.data?.data || response.data?.products || response.data || [];
            set({ products: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener productos", loading: false });
            throw error;
        }
    },

    createProduct: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createProductRequest(data);
            const newProduct = response.data?.data || response.data;
            set({ products: [newProduct, ...get().products], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear producto" });
            throw error;
        }
    },

    updateProduct: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await updateProductRequest(id, data);
            const updatedProduct = response.data?.data || response.data;
            set({
                products: get().products.map((p) => (p._id === id || p.id === id ? updatedProduct : p)),
                loading: false,
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar producto" });
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteProductRequest(id);
            set({ products: get().products.filter((p) => p.id !== id && p._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar producto" });
            throw error;
        }
    },
}));
