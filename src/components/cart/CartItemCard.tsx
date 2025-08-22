import React from "react";
import { CartItem } from "@/lib/types/cart";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";

function CartItemCard({ item }: { item: CartItem }) {
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	let isDiscountActive = false;
	let timeLeft: string = "";
	if (item.product.pricing_rule) {
		const startTime = new Date(item.product.pricing_rule.start_time);
		const endTime = new Date(item.product.pricing_rule.end_time);
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
		isDiscountActive && item.product.pricing_rule
			? Number(item.product.pricing_rule.time_discount) +
			  Number(item.product.condition_discount)
			: Number(item.product.condition_discount);

	return (
		<div className="p-4 flex items-center gap-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
			{/* Product Image */}

			<div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
				<Image
					src={item.product.image_url}
					alt={item.product.name}
					width={500}
					height={500}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Product Info */}
			<div className="flex-1">
				<h3 className="font-medium text-lg text-gray-800 mb-1">
					{item.product.name}
				</h3>
				{/* Price - TODO: Weird bug where the price is not rounded to 2 decimal places*/}
				{/* <div className="text-lg text-gray-600">${item.product.price}</div> */}
			</div>

			{discount > 0 ? (
				<div>
					<div className="flex justify-between items-center gap-3">
						<div className="flex items-center gap-2">
							<span className="font-bold text-sm text-green-600">
								$
								{Number(
									(item.product.price - (item.product.price * discount) / 100) *
										item.quantity
								).toFixed(2)}
							</span>
							<span className="text-xs text-gray-600 line-through">
								${Number(item.product.price * item.quantity).toFixed(2)}
							</span>
						</div>
					</div>

					<span className="text-xs font-semibold text-red-500">
						{timeLeft} left
					</span>
				</div>
			) : (
				<span className="font-bold text-sm text-green-600">
					${Number(item.product.price * item.quantity).toFixed(2)}
				</span>
			)}

			{/* Quantity Controls */}
			<div className="flex items-stretch border border-gray-200 rounded">
				<button
					onClick={() => updateQuantity(item, -1)}
					className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
				>
					<Minus className="w-4 h-4 text-gray-600" />
				</button>
				<span className="px-3 py-2 font-medium text-gray-800 min-w-12 text-center">
					{item.quantity}
				</span>
				<button
					onClick={() => updateQuantity(item, 1)}
					className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
				>
					<Plus className="w-4 h-4 text-gray-600" />
				</button>
			</div>

			{/* Total Price */}
			{/* <div className="text-lg font-bold text-green-600 min-w-24 text-center">
				${(item.product.price * item.quantity).toFixed(2)}
			</div> */}

			{/* Remove Button */}
			<button
				onClick={() => removeItem(item)}
				className="p-2 text-red-500 hover:bg-red-50 rounded cursor-pointer"
			>
				<Trash2 className="w-5 h-5" />
			</button>
		</div>
	);
}

export default CartItemCard;
