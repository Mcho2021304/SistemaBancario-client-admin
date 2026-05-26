import { create } from "zustand";
import {
    getDeposits as getDepositsRequest,
    createDeposit as createDepositRequest,
} from "../../../shared/api";
import { useAccountsStore } from "../../accounts/store/accountsStore";

export const useDepositsStore = create((set, get) => ({
    deposits: [],
    loading: false,
    error: null,

    getDeposits: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getDepositsRequest();
            const data = response.data?.data || response.data?.deposits || response.data || [];
            set({ deposits: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener depósitos", loading: false });
            throw error;
        }
    },

    createDeposit: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createDepositRequest(data);
            const newDeposit = response.data?.data || response.data?.deposit || response.data;
            if (newDeposit && !newDeposit.date) {
                newDeposit.date = new Date().toISOString();
            }
            set({ deposits: [newDeposit, ...get().deposits], loading: false });
            const { adjustAccountBalance, getAccounts } = useAccountsStore.getState();
            if (typeof adjustAccountBalance === "function") {
                adjustAccountBalance(newDeposit.accountNumber, Number(newDeposit.amount || 0));
            }
            if (typeof getAccounts === "function") {
                getAccounts().catch(() => {});
            }
            return newDeposit;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear depósito" });
            throw error;
        }
    },

    updateDeposit: async (id, data) => {
        try {
            set({ loading: true, error: null });
            // TODO: Implementar cuando esté disponible en el backend
            // const response = await updateDepositRequest(id, data);
            // const updatedDeposit = response.data?.data || response.data;
            // set(state => ({
            //     deposits: state.deposits.map(d => d._id === id ? updatedDeposit : d),
            //     loading: false
            // }));
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar depósito" });
            throw error;
        }
    },

    deleteDeposit: async (id) => {
        try {
            set({ loading: true, error: null });
            // TODO: Implementar cuando esté disponible en el backend
            // await deleteDepositRequest(id);
            // set(state => ({
            //     deposits: state.deposits.filter(d => d._id !== id),
            //     loading: false
            // }));
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar depósito" });
            throw error;
        }
    },
}));
