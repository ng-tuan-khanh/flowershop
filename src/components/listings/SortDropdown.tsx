import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
	value: string;
	onChange: (value: string) => void;
}

export const sortOptions = [
	{ value: "name", label: "Name (A-Z)" },
	{ value: "-name", label: "Name (Z-A)" },
	{ value: "price", label: "Price (Low to High)" },
	{ value: "-price", label: "Price (High to Low)" },
	{ value: "average_rating", label: "Rating (Low to High)" },
	{ value: "-average_rating", label: "Rating (High to Low)" },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({
	value,
	onChange,
}) => {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-[180px] bg-white">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				{sortOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SortDropdown;
