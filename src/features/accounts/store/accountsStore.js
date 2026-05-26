import { create } from "zustand";
import {
    getAccounts as getAccountsRequest,
    updateAccount as updateAccountRequest,
    deleteAccount as deleteAccountRequest,
    addExtraAccount as addExtraAccountRequest,
} from "../../../shared/api";

export const useAccountsStore = create((set, get) => ({
    accounts: [],
    loading: false,
    error: null,

    getAccounts: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAccountsRequest();
            const data = response.data?.data || response.data?.accounts || response.data || [];
            set({ accounts: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener cuentas", loading: false });
            throw error;
        }
    },

    addExtraAccount: async (data) => {
        try {
            set({ loading: true, error: null });
            await addExtraAccountRequest(data);
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear cuenta" });
            throw error;
        }
    },

    adjustAccountBalance: (accountNumber, amountDelta) => {
        set((state) => ({
            accounts: state.accounts.map((account) =>
                account.accountNumber === accountNumber
                    ? {
                          ...account,
                          balance: Number(account.balance || 0) + Number(amountDelta || 0),
                      }
                    : account
            ),
        }));
    },

    updateAccount: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await updateAccountRequest(id, data);
            const updated = response.data?.data || response.data;
            set({
                accounts: get().accounts.map((a) => (a._id === id || a.numero_cuenta === id ? updated : a)),
                loading: false,
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar cuenta" });
            throw error;
        }
    },

    deleteAccount: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteAccountRequest(id);
            set({ accounts: get().accounts.filter((a) => a._id !== id && a.numero_cuenta !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar cuenta" });
            throw error;
        }
    },
}));
