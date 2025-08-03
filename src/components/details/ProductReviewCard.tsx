import React from "react";

function ProductReviewCard() {
	return (
		<div className="py-8 flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<div className="w-10 h-10 rounded-full bg-gray-200"></div>
				<div className="flex flex-col">
					<p className="text-gray-900 font-bold">John Doe</p>
					<p className="text-gray-600 text-sm">1 day ago</p>
				</div>
			</div>
			<p className="text-gray-600 text-sm leading-relaxed">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
			</p>
		</div>
	);
}

export default ProductReviewCard;
