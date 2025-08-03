import React from "react";

interface ProductListingsSkeletonProps {
	count?: number;
}

const ProductListingsSkeleton: React.FC<ProductListingsSkeletonProps> = ({
	count = 6,
}) => {
	return (
		<main className="flex-1 bg-white p-4">
			<div className="grid grid-cols-3 gap-5">
				{[...Array(count)].map((_, index) => (
					<div
						key={index}
						className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
					></div>
				))}
			</div>
		</main>
	);
};

export default ProductListingsSkeleton;
