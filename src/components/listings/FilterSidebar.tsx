import { ChevronDown, Search } from "lucide-react";
import React from "react";
import { ProductType, Occasion } from "@/lib/types/product";
import { SelectedFilters } from "@/lib/types/filter";
import useQuery from "@/hooks/useQuery";

interface FilterSidebarProps {
	filters: SelectedFilters;
	setFilters: (filters: SelectedFilters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	filters,
	setFilters,
}) => {
	const handleSearchChange = (value: string) => {
		setFilters({ ...filters, name: value });
	};

	const handleTypeToggle = (typeName: string) => {
		setFilters({
			...filters,
			types: filters.types.includes(typeName)
				? filters.types.filter((name) => name !== typeName)
				: [...filters.types, typeName],
		});
	};

	const handleOccasionToggle = (occasionName: string) => {
		setFilters({
			...filters,
			occasions: filters.occasions.includes(occasionName)
				? filters.occasions.filter((name) => name !== occasionName)
				: [...filters.occasions, occasionName],
		});
	};

	const handlePriceStartChange = (value: string) => {
		setFilters({ ...filters, priceStart: Number(value) });
	};

	const handlePriceEndChange = (value: string) => {
		setFilters({ ...filters, priceEnd: Number(value) });
	};

	const {
		data: productTypes,
		error: productTypesError,
		isLoading: productTypesLoading,
	} = useQuery("/products/types/");
	const {
		data: occasions,
		error: occasionsError,
		isLoading: occasionsLoading,
	} = useQuery("/products/occasions/");

	if (
		productTypesLoading ||
		occasionsLoading ||
		productTypesError ||
		occasionsError
	) {
		return <div></div>;
	}

	return (
		<div className="w-80 bg-white p-4 space-y-8">
			{/* Quick Search */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="font-bold text-sm uppercase tracking-wider text-gray-800">
						QUICK SEARCH
					</span>
					<ChevronDown className="w-3 h-3 text-gray-600" />
				</div>
				<div className="flex items-center border border-gray-300 rounded px-3 py-2">
					<input
						type="text"
						placeholder="Search flowers"
						className="flex-1 outline-none text-sm"
						value={filters.name}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
					<Search className="w-4 h-4 text-gray-400" />
				</div>
			</div>

			{/* Price */}
			<div className="space-y-6">
				<div className="border-t border-gray-300"></div>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="font-bold text-sm uppercase tracking-wider text-gray-800">
							PRICE
						</span>
						<ChevronDown className="w-3 h-3 text-gray-600" />
					</div>
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<input
								type="number"
								value={filters.priceStart}
								onChange={(e) => handlePriceStartChange(e.target.value)}
								className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
							/>
							<div className="w-4 h-0.5 bg-gray-600"></div>
							<input
								type="number"
								value={filters.priceEnd}
								onChange={(e) => handlePriceEndChange(e.target.value)}
								className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Flower Types */}
			<div className="space-y-6">
				<div className="border-t border-gray-300"></div>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="font-bold text-sm uppercase tracking-wider text-gray-800">
							FLOWER TYPES
						</span>
						<ChevronDown className="w-3 h-3 text-gray-600" />
					</div>
					<div className="space-y-4">
						{productTypes.map((item: ProductType) => (
							<div key={item.name} className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={filters.types.includes(item.name)}
									onChange={() => handleTypeToggle(item.name)}
									className="w-4 h-4 text-green-600 rounded border-gray-300"
								/>
								<span className="text-sm text-gray-700">{item.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Occasion */}
			<div className="space-y-6">
				<div className="border-t border-gray-300"></div>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="font-bold text-sm uppercase tracking-wider text-gray-800">
							OCCASION
						</span>
						<ChevronDown className="w-3 h-3 text-gray-600" />
					</div>
					<div className="space-y-4">
						{occasions.map((item: Occasion) => (
							<div key={item.name} className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={filters.occasions.includes(item.name)}
									onChange={() => handleOccasionToggle(item.name)}
									className="w-4 h-4 text-green-600 rounded border-gray-300"
								/>
								<span className="text-sm text-gray-700">{item.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;
