import { stringify } from "querystring";
import { fetchUtils, GetListParams } from "react-admin";

const BACKEND_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

const httpClient = (url: string, options: any = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: "application/json" });
	}

	const auth = localStorage.getItem("auth");
	if (auth) {
		try {
			const { token } = JSON.parse(auth);
			if (token) {
				options.headers.set("Authorization", `Token ${token}`);
			}
		} catch (error) {
			console.error("Error parsing auth data:", error);
		}
	}
	return fetchUtils.fetchJson(url, options);
};

// Resource-specific URL mapping
const getResourceUrl = (resource: string, id?: string) => {
	const urlMap: Record<string, string> = {
		products: "products/products/",
		types: "products/types/",
		promotions: "pricing-rules/time-pricing-rules/",
		orders: "orders/",
	};

	const baseUrl = `${BACKEND_URL}/${urlMap[resource]}`;
	return id ? `${baseUrl}${id}/` : baseUrl;
};

export default {
	getList: async (resource: string, params: GetListParams) => {
		const { page, perPage } = params.pagination!;
		const { field, order } = params.sort!;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify(params.filter),
		};
		const url = getResourceUrl(resource) + `?${stringify(query)}`;

		const { json, headers } = await httpClient(url, { signal: params.signal });

		// Handle different response formats from Django REST framework
		let data = json;
		let total = 0;

		// If the response is an object with 'results' key (common in Django REST framework)
		if (json && typeof json === "object" && "results" in json) {
			data = json.results;
			total = json.count || json.results.length;
		}
		// If the response is directly an array
		else if (Array.isArray(json)) {
			data = json;
			total = json.length;
		}
		// If the response is a single object (error case)
		else if (json && typeof json === "object" && !Array.isArray(json)) {
			// This might be an error response, wrap it in an array or handle appropriately
			data = [json];
			total = 1;
		}

		// Ensure each item has an 'id' field required by React Admin
		const processedData = Array.isArray(data)
			? data.map((item) => {
					// Ensure each item has an id field
					if (!item.id && item.pk) {
						return { ...item, id: item.pk };
					}
					if (!item.id && item.ID) {
						return { ...item, id: item.ID };
					}
					return item;
			  })
			: [];

		return {
			data: processedData,
			total: total,
		};
	},

	getOne: async (resource: string, params: any) => {
		const url = getResourceUrl(resource, params.id);
		const { json } = await httpClient(url, { signal: params.signal });

		// Ensure the item has an 'id' field required by React Admin
		let data = json;
		if (data && !data.id && data.pk) {
			data = { ...data, id: data.pk };
		}
		if (data && !data.id && data.ID) {
			data = { ...data, id: data.ID };
		}

		return { data: data };
	},

	getMany: async (resource: string, params: any) => {
		const query = {
			filter: JSON.stringify({ ids: params.ids }),
		};
		const url = `${getResourceUrl(resource)}?${stringify(query)}`;
		const { json } = await httpClient(url, { signal: params.signal });

		// Ensure each item has an 'id' field required by React Admin
		let data = json;
		if (Array.isArray(data)) {
			data = data.map((item) => {
				if (!item.id && item.pk) {
					return { ...item, id: item.pk };
				}
				if (!item.id && item.ID) {
					return { ...item, id: item.ID };
				}
				return item;
			});
		}

		return { data: data };
	},

	getManyReference: async (resource: string, params: any) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			}),
		};
		const url = `${getResourceUrl(resource)}?${stringify(query)}`;
		const { json, headers } = await httpClient(url, { signal: params.signal });

		let total = 0;
		if (headers && headers.get("content-range")) {
			total = parseInt(
				headers.get("content-range")?.split("/").pop() || "0",
				10
			);
		} else if (Array.isArray(json)) {
			total = json.length;
		}

		// Ensure each item has an 'id' field required by React Admin
		const processedData = Array.isArray(json)
			? json.map((item) => {
					if (!item.id && item.pk) {
						return { ...item, id: item.pk };
					}
					if (!item.id && item.ID) {
						return { ...item, id: item.ID };
					}
					return item;
			  })
			: [];

		return {
			data: processedData,
			total: total,
		};
	},

	create: async (resource: string, params: any) => {
		const url = getResourceUrl(resource);
		const { json } = await httpClient(url, {
			method: "POST",
			body: JSON.stringify(params.data),
		});

		// Ensure the item has an 'id' field required by React Admin
		let data = json;
		if (data && !data.id && data.pk) {
			data = { ...data, id: data.pk };
		}
		if (data && !data.id && data.ID) {
			data = { ...data, id: data.ID };
		}

		return { data: data };
	},

	update: async (resource: string, params: any) => {
		const url = getResourceUrl(resource, params.id);
		const { json } = await httpClient(url, {
			method: "PATCH", // Changed from PUT to PATCH for Django REST framework compatibility
			body: JSON.stringify(params.data),
		});

		// Ensure the item has an 'id' field required by React Admin
		let data = json;
		if (data && !data.id && data.pk) {
			data = { ...data, id: data.pk };
		}
		if (data && !data.id && data.ID) {
			data = { ...data, id: data.ID };
		}

		return { data: data };
	},

	updateMany: async (resource: string, params: any) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		const url = `${getResourceUrl(resource)}?${stringify(query)}`;
		const { json } = await httpClient(url, {
			method: "PATCH", // Changed from PUT to PATCH for Django REST framework compatibility
			body: JSON.stringify(params.data),
		});

		// Ensure each item has an 'id' field required by React Admin
		let data = json;
		if (Array.isArray(data)) {
			data = data.map((item) => {
				if (!item.id && item.pk) {
					return { ...item, id: item.pk };
				}
				if (!item.id && item.ID) {
					return { ...item, id: item.ID };
				}
				return item;
			});
		}

		return { data: data };
	},

	delete: async (resource: string, params: any) => {
		const url = getResourceUrl(resource, params.id);
		const { json } = await httpClient(url, {
			method: "DELETE",
		});

		// Ensure the item has an 'id' field required by React Admin
		let data = json;
		if (data && !data.id && data.pk) {
			data = { ...data, id: data.pk };
		}
		if (data && !data.id && data.ID) {
			data = { ...data, id: data.ID };
		}

		return { data: data };
	},

	deleteMany: async (resource: string, params: any) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		const url = `${getResourceUrl(resource)}?${stringify(query)}`;
		const { json } = await httpClient(url, {
			method: "DELETE",
			body: JSON.stringify(params.data),
		});

		// Ensure each item has an 'id' field required by React Admin
		let data = json;
		if (Array.isArray(data)) {
			data = data.map((item) => {
				if (!item.id && item.pk) {
					return { ...item, id: item.pk };
				}
				if (!item.id && item.ID) {
					return { ...item, id: item.ID };
				}
				return item;
			});
		}

		return { data: data };
	},
};
