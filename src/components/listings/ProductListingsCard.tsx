import { Product } from "@/lib/types/product";
import { Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/details/${product.id}`);
	};

	let isDiscountActive = false;
	let timeLeft: string = "";
	if (product.pricing_rule) {
		const startTime = new Date(product.pricing_rule.start_time);
		const endTime = new Date(product.pricing_rule.end_time);
		const now = new Date();

		if (now >= startTime && now <= endTime) {
			isDiscountActive = true;

			const now = new Date();
			const diff = endTime.getTime() - now.getTime();

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(diff / (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)
			);
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

			timeLeft = `${days}d ${hours}h ${minutes}m`;
		}
	}

	const discount =
		isDiscountActive && product.pricing_rule
			? Number(product.pricing_rule.time_discount) +
			  Number(product.condition_discount)
			: Number(product.condition_discount);
	return (
		<div
			className="h-full bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
			onClick={handleClick}
		>
			<div className="w-full h-80 flex items-center justify-center">
				<Image
					src={product.image_url}
					alt={product.name}
					width={500}
					height={500}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-5 space-y-3">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<h3 className="font-bold text-xs text-gray-800">{product.name}</h3>
						<p className="text-xs text-gray-600 leading-relaxed line-clamp-1">
							{product.description}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2 justify-between">
					<div className="flex items-center gap-2">
						<div className="flex items-center">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-4 h-4 ${
										i < (product.average_rating ?? 0)
											? "fill-yellow-400 text-yellow-400"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-xs text-gray-600">
							({product.total_reviews})
						</span>
					</div>
					<span className="px-2 py-1 rounded-md border-green-600 border-1 text-green-600 text-sm font-semibold capitalize">
						{product.condition}
					</span>
				</div>

				{discount > 0 ? (
					<div>
						<div className="flex justify-between items-center gap-3">
							<div className="flex items-center gap-2">
								<span className="font-bold text-sm text-green-600">
									$
									{Number(
										product.price - (product.price * discount) / 100
									).toFixed(2)}
								</span>
								<span className="text-xs text-gray-600 line-through">
									${Number(product.price).toFixed(2)}
								</span>
							</div>

							<div className="flex flex-col items-end gap-1">
								<span className="px-2 py-1 rounded-md bg-green-600 text-sm font-bold text-white">
									-{Number(discount).toFixed(2)}%
								</span>
							</div>
						</div>

						<span className="text-xs font-semibold text-red-500">
							{timeLeft} left
						</span>
					</div>
				) : (
					<span className="font-bold text-sm text-green-600">
						${Number(product.price).toFixed(2)}
					</span>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
