"use client";

import ViewAllButton from "@/components/home/ViewAllButton";
import ProductCard from "@/components/listings/ProductListingsCard";
import { Product } from "@/lib/types/product";
import { useRouter } from "next/navigation";
import React from "react";

function FreshProductsSection({ fresh }: { fresh: Product[] }) {
	const router = useRouter();
	const handleClick = () => {
		router.push("/listings");
	};
	return (
		<section className="px-20">
			<div className="flex justify-between items-center mb-12">
				<h2 className="text-3xl font-medium text-black">Fresh Flowers</h2>
				<ViewAllButton handleClick={handleClick} />
			</div>

			<div className="grid grid-cols-4 gap-5">
				{fresh.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

export default FreshProductsSection;
