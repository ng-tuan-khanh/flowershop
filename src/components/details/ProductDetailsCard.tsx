import { useCartStore } from "@/hooks/useCartStore";
import { Product } from "@/lib/types/product";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ProductDetailsCard({ product }: { product: Product }) {
	const router = useRouter();
	const [quantity, setQuantity] = useState(1);

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

	const getTotalPrice = () => {
		if (discount > 0) {
			const discountedPrice = product.price - (product.price * discount) / 100;
			return (discountedPrice * quantity).toFixed(2);
		}
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
							className="w-full h-full object-cover rounded-lg"
						/>
					</div>
				</div>
			</div>

			{/* Product Details */}
			<div className="space-y-8 flex flex-col justify-center">
				{/* Title and Price */}
				<div className="flex justify-between items-start">
					<div className="space-y-2">
						<div className="flex items-center gap-4">
							<h1 className="text-2xl font-bold text-gray-900">
								{product.name.toUpperCase()}
							</h1>
							<span className="px-2 py-1 rounded-md border-green-600 border-1 text-green-600 text-sm font-semibold capitalize">
								{product.condition}
							</span>
						</div>
						{discount > 0 ? (
							<div>
								<div className="flex justify-between items-center gap-6 mb-2">
									<div className="flex items-center gap-4">
										<span className="font-bold text-xl text-green-600">
											$
											{Number(
												product.price - (product.price * discount) / 100
											).toFixed(2)}
										</span>
										<span className="text-md text-gray-600 line-through">
											${Number(product.price).toFixed(2)}
										</span>
									</div>
								</div>

								<span className="text-md font-semibold text-red-500">
									{timeLeft} left
								</span>
							</div>
						) : (
							<span className="font-bold text-xl text-green-600">
								${Number(product.price).toFixed(2)}
							</span>
						)}
						{/* <p className="text-xl font-medium text-gray-900">
							${product.price}
						</p> */}
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
