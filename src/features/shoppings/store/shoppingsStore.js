import { create } from "zustand";
import {
    getShoppings as getShoppingsRequest,
    createShopping as createShoppingRequest,
    deleteShopping as deleteShoppingRequest,
} from "../../../shared/api";
import { useAccountsStore } from "../../accounts/store/accountsStore";

export const useShoppingsStore = create((set, get) => ({
    shoppings: [],
    loading: false,
    error: null,

    getShoppings: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getShoppingsRequest();
            const data = response.data?.data || response.data?.shoppings || response.data?.shopping || response.data || [];
            set({ shoppings: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener compras", loading: false });
            throw error;
        }
    },

    createShopping: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createShoppingRequest(data);
            const newShopping = response.data?.data || response.data?.shopping || response.data;
            if (newShopping && !newShopping.date) {
                newShopping.date = new Date().toISOString();
            }
            set({ shoppings: [newShopping, ...get().shoppings], loading: false });
            const { adjustAccountBalance, getAccounts } = useAccountsStore.getState();
            if (typeof adjustAccountBalance === "function") {
                adjustAccountBalance(newShopping.accountNumber, -Number(newShopping.amount || 0));
            }
            if (typeof getAccounts === "function") {
                getAccounts().catch(() => {});
            }
            return newShopping;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear compra" });
            throw error;
        }
    },

    deleteShopping: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteShoppingRequest(id);
            set({ shoppings: get().shoppings.filter((s) => s._id !== id && s.id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar compra" });
            throw error;
        }
    },
}));