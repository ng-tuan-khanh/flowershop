export interface SelectedFilters {
	name: string;
	types: string[];
	occasions: string[];
	conditions: string[];
	priceStart: number;
	priceEnd: number;
}

export const defaultSelectedFilters: SelectedFilters = {
	name: "",
	types: [],
	occasions: [],
	conditions: [],
	priceStart: 0,
	priceEnd: 200,
};
