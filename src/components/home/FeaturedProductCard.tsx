"use client";

import { Product } from "@/lib/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function FeaturedProductCard({ product }: { product: Product }) {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/details/${product.id}`);
	};
	return (
		<div
			className="rounded-lg overflow-hidden cursor-pointer"
			onClick={handleClick}
		>
			<div className="w-full h-80 flex items-center justify-center relative">
				<Image
					src={product.image_url}
					alt={product.name}
					width={500}
					height={500}
					className="w-full h-full object-cover"
				/>

				<div className="absolute top-2.5 left-2.5">
					<div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
						<span>🌟</span>
						<span>Featured</span>
					</div>
				</div>
			</div>
			<div className="bg-green-600 p-5 flex gap-4 justify-between items-center">
				<div>
					<h3 className="text-white font-bold">{product.name}</h3>
					<p className="text-gray-200 text-sm opacity-85 line-clamp-1 overflow-ellipsis">
						{product.description}
					</p>
				</div>
				<div
					className="flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-3 cursor-pointer hover:bg-green-700 transition-all duration-300"
					onClick={handleClick}
				>
					<span className="text-white font-medium">${product.price}</span>
					<ShoppingCart className="w-4 h-4 text-white" />
				</div>
			</div>
		</div>
	);
}

export default FeaturedProductCard;
