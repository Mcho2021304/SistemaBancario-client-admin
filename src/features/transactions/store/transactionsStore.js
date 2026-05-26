import { create } from "zustand";
import { getTransactions as getTransactionsRequest } from "../../../shared/api";

export const useTransactionsStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  getTransactions: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getTransactionsRequest();
      const data = response.data?.data || response.data?.transactions || response.data || [];
      set({ transactions: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener transacciones",
        loading: false,
      });
      throw error;
    }
  },
}));