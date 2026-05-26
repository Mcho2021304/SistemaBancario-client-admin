import { create } from "zustand";
import {
    getCards as getCardsRequest,
    createCard as createCardRequest,
    deleteCard as deleteCardRequest,
} from "../../../shared/api";

export const useCardsStore = create((set, get) => ({
    cards: [],
    loading: false,
    error: null,

    getCards: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getCardsRequest();
            const data = response.data?.data || response.data?.cards || response.data || [];
            set({ cards: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener tarjetas", loading: false });
            throw error;
        }
    },

    createCard: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createCardRequest(data);
            const newCard = response.data?.data || response.data;
            set({ cards: [newCard, ...get().cards], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al emitir tarjeta" });
            throw error;
        }
    },

    deleteCard: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteCardRequest(id);
            set({ cards: get().cards.filter((c) => c.id !== id && c._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar tarjeta" });
            throw error;
        }
    },
}));
