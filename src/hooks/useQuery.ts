import useSWR from "swr";
import api from "@/lib/api";

const fetcher = (url: string) =>
	api.get((url = `${url}`)).then((res) => res.data);

const useQuery = (url: string) => {
	const { data, error, isLoading } = useSWR(url, fetcher);

	return { data, error, isLoading };
};

export default useQuery;
