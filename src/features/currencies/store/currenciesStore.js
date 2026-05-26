import { create } from "zustand";
import {
    getCurrencies as getCurrenciesRequest,
    createCurrency as createCurrencyRequest,
    updateCurrency as updateCurrencyRequest,
    deleteCurrency as deleteCurrencyRequest,
} from "../../../shared/api";

export const useCurrenciesStore = create((set, get) => ({
    currencies: [],
    loading: false,
    error: null,

    getCurrencies: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getCurrenciesRequest();
            const data = response.data?.data || response.data?.currencies || response.data || [];
            set({ currencies: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener divisas", loading: false });
            throw error;
        }
    },

    createCurrency: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createCurrencyRequest(data);
            const newCurrency = response.data?.data || response.data;
            set({ currencies: [newCurrency, ...get().currencies], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear divisa" });
            throw error;
        }
    },

    updateCurrency: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await updateCurrencyRequest(id, data);
            const updated = response.data?.data || response.data;
            set({
                currencies: get().currencies.map((c) => (c.id === id || c._id === id ? updated : c)),
                loading: false,
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar divisa" });
            throw error;
        }
    },

    deleteCurrency: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteCurrencyRequest(id);
            set({ currencies: get().currencies.filter((c) => c.id !== id && c._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar divisa" });
            throw error;
        }
    },
}));
