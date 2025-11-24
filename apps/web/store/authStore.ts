import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email: string, _password: string) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Mock successful login
                set({
                    user: {
                        id: "user-1",
                        email,
                        name: email.split("@")[0] ?? "User",
                    },
                    isAuthenticated: true,
                });
                return true;
            },

            signup: async (email: string, _password: string, name: string) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Mock successful signup
                set({
                    user: {
                        id: "user-" + Date.now(),
                        email,
                        name,
                    },
                    isAuthenticated: true,
                });
                return true;
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
