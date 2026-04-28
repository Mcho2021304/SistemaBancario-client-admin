import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

import { 
    login as loginRequest
} from "../../../shared/api";


export const useAuthStore = create(
    persist(
        (set, get)=>({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: ()=> {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "DAMIN_ROLE";

                if(token && !isAdmin){
                    set({
                        user:null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated:false,
                        isLoadingAuth:false,
                        erro: "No tienes permiso para acceder como administrador"
                    })
                }
            },
            
            logout: ()=>{
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            // ----------------------------------------------------------------
            login: async ({emailOrUsername, password})=>{

                const { data } = await loginRequest({emailOrUsername, password})
                
                // Sólo administradores pueden inciar sesión en cliente-admin
                const role = data?.userDetails?.role;
                if(role !== "ADMIN_ROLE"){
                    const message = "No tienes permisos para acceder como administrador";
                    
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        loading: false,
                        error: message,
                    });

                    toast.error(message);
                    return {succes: false, error: message};
                }

                set(
                    {
                        user: data.userDetails,
                        token: data.accessToken || data.token,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresIn || data.expiresAt,
                        isAuthenticated: true,
                        loading: false,
                    }
                );
                
                return {succes: true}

            },
            // ----------------------------------------------------------------
        }),
        {name: "auth-store"}
    )
);