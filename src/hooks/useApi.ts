// hooks/useApi.ts
import { useState, useEffect, useRef, useCallback } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import api from "@/lib/axios";

type ApiFunction<T, P extends any[]> = (
	...args: [...P, { cancelToken: any }]
) => Promise<AxiosResponse<T>>;

interface UseApiResult<T, P extends any[]> {
	data: T | null;
	loading: boolean;
	error: string | null;
	request: (...args: P) => Promise<void>;
}

const useApi = <T, P extends any[]>(
	apiFunc: ApiFunction<T, P>,
	immediate = false
): UseApiResult<T, P> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(immediate);
	const [error, setError] = useState<string | null>(null);
	const cancelTokenSource = useRef<CancelTokenSource | null>(null);

	const request = useCallback(
		async (...args: P) => {
			setLoading(true);
			setError(null);

			// Cancel any previous request
			if (cancelTokenSource.current) {
				cancelTokenSource.current.cancel(
					"Operation canceled due to new request."
				);
			}

			cancelTokenSource.current = axios.CancelToken.source();

			try {
				const result = await apiFunc(...args, {
					cancelToken: cancelTokenSource.current.token,
				});
				setData(result.data);
			} catch (err) {
				if (axios.isCancel(err)) {
					console.log(
						"Request canceled:",
						err instanceof Error ? err.message : String(err)
					);
				} else {
					setError(err instanceof Error ? err.message : String(err));
				}
			} finally {
				setLoading(false);
			}
		},
		[apiFunc]
	);

	// Cleanup on component unmount
	useEffect(() => {
		return () => {
			if (cancelTokenSource.current) {
				cancelTokenSource.current.cancel("Component unmounted.");
			}
		};
	}, []);

	return { data, loading, error, request };
};

export default useApi;
