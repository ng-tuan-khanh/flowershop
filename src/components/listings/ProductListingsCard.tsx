import { Product } from "@/lib/types/product";
import { Star } from "lucide-react";
import React from "react";
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

	return (
		<div
			className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
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
						<p className="text-xs text-gray-600 leading-relaxed">
							{product.description}
						</p>
					</div>
				</div>
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
				<div className="flex items-center gap-3">
					<span className="font-bold text-sm text-green-600">
						${product.price}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
