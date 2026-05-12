import { create } from "zustand";
import {
    getAllUsers,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
    deleteUser as deactivateUserRequest,
} from "../../../shared/api/admin";

export const useUsersStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    getUsers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllUsers();
            const data = response.data?.users || response.data || [];
            set({ users: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener usuarios",
                loading: false,
            });
            throw error;
        }
    },

    createUser: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createUserRequest(data);
            await get().getUsers();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear usuario",
            });
            throw error;
        }
    },

    updateUser: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await updateUserRequest(id, data);
            await get().getUsers();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al actualizar usuario",
            });
            throw error;
        }
    },

    deactivateUser: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await deactivateUserRequest(id);
            set({
                users: get().users.filter((u) => u._id !== id),
                loading: false,
            });
            return response.data;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al inactivar usuario",
            });
            throw error;
        }
    },
}));
