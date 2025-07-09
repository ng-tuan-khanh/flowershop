export interface FilterItem {
	name: string;
	count?: string;
	checked?: boolean;
}

export interface ColorFilter {
	color: string;
	selected: boolean;
	name: string;
}

export interface SelectedFilters {
	types: string[];
	colors: string[];
	occasions: string[];
	priceRange: number[];
}
