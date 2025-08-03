import { ArrowRight } from "lucide-react";
import React from "react";

function ViewAllButton({ handleClick }: { handleClick: () => void }) {
	return (
		<div
			className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
			onClick={handleClick}
		>
			<span className="text-sm">View all</span>
			<ArrowRight className="w-4 h-4" />
		</div>
	);
}

export default ViewAllButton;
