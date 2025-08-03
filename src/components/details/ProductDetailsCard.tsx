import { useCartStore } from "@/hooks/useCartStore";
import { Product } from "@/lib/types/product";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ProductDetailsCard({ product }: { product: Product }) {
	const router = useRouter();
	const [quantity, setQuantity] = useState(1);

	const getTotalPrice = () => {
		return (product.price * quantity).toFixed(2);
	};

	const handleQuantityChange = (change: number) => {
		setQuantity(Math.max(1, quantity + change));
	};

	const addItem = useCartStore((state) => state.addItem);
	const handleAddToCart = () => {
		addItem(product, quantity);
		router.push("/cart");
	};

	const handleOrderNow = () => {
		addItem(product, quantity);
		router.push("/checkout");
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
			{/* Product Images */}
			<div className="flex gap-4">
				{/* Main Product Image */}
				<div className="flex-1">
					<div className="w-full h-[600px] bg-gradient-to-br from-pink-200 to-red-400 rounded-lg flex items-center justify-center">
						<Image
							src={product.image_url}
							alt={product.name}
							width={500}
							height={500}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>

			{/* Product Details */}
			<div className="space-y-8 flex flex-col justify-center">
				{/* Title and Price */}
				<div className="flex justify-between items-start">
					<div className="space-y-2">
						<h1 className="text-2xl font-bold text-gray-900">
							{product.name.toUpperCase()}
						</h1>
						<p className="text-xl font-medium text-gray-900">
							${product.price}
						</p>
					</div>
				</div>

				{/* Quantity Selector */}
				<div className="space-y-4">
					<h3 className="text-base font-medium text-gray-900">Quantity</h3>
					<div className="flex items-center gap-5">
						<div className="flex items-center border border-gray-300 rounded">
							<button
								onClick={() => handleQuantityChange(-1)}
								className="p-2 hover:bg-gray-50"
							>
								<Minus className="w-4 h-4 text-gray-600" />
							</button>
							<span className="px-4 py-2 font-medium text-gray-900">
								{quantity}
							</span>
							<button
								onClick={() => handleQuantityChange(1)}
								className="p-2 hover:bg-gray-50"
							>
								<Plus className="w-4 h-4 text-gray-600" />
							</button>
						</div>
					</div>
				</div>

				{/* Price Summary */}
				<div className="bg-green-50 rounded p-6 space-y-4">
					<div className="flex justify-between text-lg font-bold text-gray-900">
						<span>Total</span>
						<span>${getTotalPrice()}</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-5">
					<button
						className="flex-1 bg-green-600 text-white py-4 px-8 rounded font-medium hover:bg-green-700 transition-colors cursor-pointer"
						onClick={handleOrderNow}
					>
						ORDER NOW
					</button>
					<button
						className="flex-1 border border-gray-400 text-gray-900 py-4 px-8 rounded font-medium hover:bg-gray-50 transition-colors cursor-pointer"
						onClick={handleAddToCart}
					>
						ADD TO CART
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailsCard;
