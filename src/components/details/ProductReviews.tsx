import ProductReviewCard from "@/components/details/ProductReviewCard";
import { Product } from "@/lib/types/product";
import React from "react";

const NUM_REVIEWS = 3;

function ProductReviews({ product }: { product: Product }) {
	return (
		<>
			{/* Reviews */}
			<div className="mt-16">
				<div className="border-b border-gray-200">
					<div className="flex space-x-16">
						<button className="pb-4 text-sm font-bold text-gray-900 border-b-2 border-gray-900 uppercase tracking-wider">
							Reviews ({product.total_reviews})
						</button>
					</div>
					{[...Array(NUM_REVIEWS)].map((_, index) => (
						<ProductReviewCard key={index} />
					))}
				</div>
			</div>
		</>
	);
}

export default ProductReviews;
