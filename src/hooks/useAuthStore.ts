import api from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
	token: string | null;
	isAuthenticated: boolean;
	signIn: (username: string, password: string) => void;
	signUp: (username: string, email: string, password: string) => void;
	signOut: () => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			isAuthenticated: false,
			signIn: async (username: string, password: string) => {
				const data = await api
					.post("/auth/get-auth-token/", {
						username,
						password,
					})
					.then((res) => res.data);
				set({ token: data.token, isAuthenticated: true });
			},
			signUp: async (username: string, email: string, password: string) => {
				const data = await api
					.post("/auth/register/", {
						username,
						email,
						password,
					})
					.then((res) => res.data);
				set({ token: data.token, isAuthenticated: true });
			},
			signOut: () => set({ token: null, isAuthenticated: false }),
		}),
		{
			name: "auth-store",
		}
	)
);
