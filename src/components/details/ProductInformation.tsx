import { Product } from "@/lib/types/product";
import React from "react";

function ProductInformation({ product }: { product: Product }) {
	return (
		<div className="mt-16">
			<div className="border-b border-gray-200">
				<div className="flex space-x-16">
					<button className="pb-4 text-sm font-bold text-gray-900 border-b-2 border-gray-900 uppercase tracking-wider">
						Flower details
					</button>
				</div>
			</div>

			{/* Product Details Content - keeping existing content */}
			<div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* Left Column */}
				<div className="space-y-6">
					<div>
						<h4 className="font-bold text-gray-900 mb-4">Description</h4>
						<p className="text-gray-600 text-sm leading-relaxed">
							{product.description}
						</p>
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					<div>
						<h4 className="font-bold text-gray-900 mb-4">
							Flower Source & Quality
						</h4>
						<p className="text-sm text-gray-600 leading-relaxed">
							Our flowers are sourced from certified sustainable farms and
							undergo strict quality control. We work with local growers to
							ensure the freshest flowers while supporting our community. Each
							bouquet is arranged fresh daily by our skilled florists.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductInformation;
