import { create } from "zustand";
import {
    getPassbooks as getPassbooksRequest,
    createPassbook as createPassbookRequest,
    deletePassbook as deletePassbookRequest,
} from "../../../shared/api";

export const usePassbooksStore = create((set, get) => ({
    passbooks: [],
    loading: false,
    error: null,

    getPassbooks: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getPassbooksRequest();
            const data = response.data?.data || response.data?.passbooks || response.data || [];
            set({ passbooks: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener libretas", loading: false });
            throw error;
        }
    },

    createPassbook: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createPassbookRequest(data);
            const newPassbook = response.data?.data || response.data;
            set({ passbooks: [newPassbook, ...get().passbooks], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear libreta" });
            throw error;
        }
    },

    deletePassbook: async (id) => {
        try {
            set({ loading: true, error: null });
            await deletePassbookRequest(id);
            set({ passbooks: get().passbooks.filter((p) => p.id !== id && p._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar libreta" });
            throw error;
        }
    },
}));