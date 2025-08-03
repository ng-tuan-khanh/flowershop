"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function FeaturedCategoriesSection() {
	const router = useRouter();
	const handleShopClick = () => {
		router.push("/listings");
	};
	return (
		<section className="px-20">
			<div className="grid grid-cols-2 gap-5 justify-center items-center">
				<div className="p-16 flex flex-col justify-between items-center rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-purple-200 text-white gap-8">
					<div className="flex flex-col items-center gap-4">
						<h3 className="text-4xl font-bold text-center">
							Wedding Season Collection
						</h3>
						<p className="text-3xl text-center">
							Bridal bouquets & ceremony flowers
						</p>
					</div>
					<button
						className="w-64 p-4 rounded flex justify-center items-center gap-4 text-white font-medium uppercase cursor-pointer bg-purple-600 hover:bg-purple-700"
						onClick={handleShopClick}
					>
						<ShoppingCart className="w-5 h-5" />
						Explore
					</button>
				</div>

				<div className="p-16 flex flex-col justify-between items-center rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-orange-200 text-white gap-8">
					<div className="flex flex-col items-center gap-4">
						<h3 className="text-4xl font-bold text-center">
							Garden Plants & Herbs
						</h3>
						<p className="text-3xl text-center">Indoor & outdoor plants</p>
					</div>
					<button
						className="w-64 p-4 rounded flex justify-center items-center gap-4 text-white font-medium uppercase cursor-pointer bg-orange-600 hover:bg-orange-700"
						onClick={handleShopClick}
					>
						<ShoppingCart className="w-5 h-5" />
						Explore
					</button>
				</div>
			</div>
		</section>
	);
}

export default FeaturedCategoriesSection;
