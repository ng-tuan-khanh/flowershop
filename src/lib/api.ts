import axios, { InternalAxiosRequestConfig } from "axios";
import ERROR_MESSAGES from "@/lib/errorMessages";
import { toast } from "react-toastify";
import Router from "next/router";
import { useAuthStore } from "@/hooks/useAuthStore";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "localhost:8000",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (typeof window !== "undefined") {
			const { token } = useAuthStore.getState();

			if (token && config.headers) {
				config.headers["Authorization"] = `Token ${token}`;
			}
		}
		return config;
	},
	(error) => {
		console.error("Request Interceptor Error:", error);
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		let message = ERROR_MESSAGES.GENERIC_ERROR;

		if (error.response) {
			const { status, data } = error.response;

			console.log("Error Status:", error.status);

			// Attempt to use a custom error message from the server
			if (data && data.message) {
				message = data.message;
			} else {
				// Fallback to predefined error messages
				message =
					ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ||
					ERROR_MESSAGES.GENERIC_ERROR;
			}

			// Handle 401 Unauthorized
			if (status === 401) {
				Router.push("/sign-in");
			}
		} else {
			// Handle network errors
			message = ERROR_MESSAGES.NETWORK_ERROR;
		}

		toast.error(message); // Display the error message
		return Promise.reject(new Error(message)); // Reject the promise with the error message
	}
);

export default api;
