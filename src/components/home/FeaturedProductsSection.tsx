import FeaturedProductCard from "@/components/home/FeaturedProductCard";
import ViewAllButton from "@/components/home/ViewAllButton";
import { Product } from "@/lib/types/product";
import { useRouter } from "next/navigation";
import React from "react";

function FeaturedProductsSection({ featured }: { featured: Product[] }) {
	const router = useRouter();
	const handleClick = () => {
		router.push("/listings");
	};
	return (
		<section className="px-20">
			<div className="flex justify-between items-center mb-12">
				<h2 className="text-3xl font-medium text-black">Featured Flowers</h2>
				<ViewAllButton handleClick={handleClick} />
			</div>

			<div className="grid grid-cols-3 gap-5">
				{featured.map((product, index) => (
					<FeaturedProductCard key={index} product={product} />
				))}
			</div>
		</section>
	);
}

export default FeaturedProductsSection;
