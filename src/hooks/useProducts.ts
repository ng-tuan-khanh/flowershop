import { SelectedFilters } from "@/lib/types/filter";
import useQuery from "./useQuery";

const useProducts = (
	filters: SelectedFilters,
	page: number,
	sortOption: string
) => {
	const { name, types, occasions, conditions, priceStart, priceEnd } = filters;

	const queryParams = new URLSearchParams();

	if (name) queryParams.append("name__icontains", name);
	if (types) queryParams.append("type__name__in", types.join(","));
	if (occasions) queryParams.append("occasion__name__in", occasions.join(","));
	if (conditions) queryParams.append("condition__in", conditions.join(","));
	if (priceStart) queryParams.append("price__gt", priceStart.toString());
	if (priceEnd) queryParams.append("price__lt", priceEnd.toString());
	queryParams.append("page", page.toString());
	queryParams.append("ordering", sortOption);

	const url = `/products/products/?${queryParams.toString()}`;
	const { data, error, isLoading } = useQuery(url);

	return { data, error, isLoading };
};

export default useProducts;
