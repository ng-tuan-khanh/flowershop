import ProductCard from "@/components/listings/ProductListingsCard";
import { Product } from "@/lib/types/product";
import React from "react";

interface ProductListingsProps {
	products: Product[];
}

const ProductListings: React.FC<ProductListingsProps> = ({ products }) => {
	return (
		<main className="flex-1 bg-white p-4">
			<div className="grid grid-cols-3 gap-5">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</main>
	);
};

export default ProductListings;
