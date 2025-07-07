import axios from "axios";
import ERROR_MESSAGES from "@/lib/errorMessages";
import { toast } from "react-toastify";
import Router from "next/router";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "localhost:8000",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		let message = ERROR_MESSAGES.GENERIC_ERROR;

		if (error.response) {
			const { status, data } = error.response;

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
				Router.push("/login"); // Redirect to the login page
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
