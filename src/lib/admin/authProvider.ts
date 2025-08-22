import type { AuthProvider } from "react-admin";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const authProvider: AuthProvider = {
	// send username and password to the auth server and get back credentials
	async login({ username, email, password }) {
		const request = new Request(`${BACKEND_URL}/auth/admin/`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		let response;
		try {
			response = await fetch(request);
		} catch (_error) {
			throw new Error("Network error");
		}
		if (response.status < 200 || response.status >= 300) {
			throw new Error(response.statusText);
		}
		const auth = await response.json();
		localStorage.setItem("auth", JSON.stringify(auth));
	},
	// when the dataProvider returns an error, check if this is an authentication error
	async checkError(error) {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem("auth");
			throw new Error();
		}
		// other error code (404, 500, etc): no need to log out
	},
	// when the user navigates, make sure that their credentials are still valid
	async checkAuth() {
		if (!localStorage.getItem("auth")) {
			throw new Error();
		}
	},
	// remove local credentials and notify the auth server that the user logged out
	async logout() {
		localStorage.removeItem("auth");
	},
};

export default authProvider;
