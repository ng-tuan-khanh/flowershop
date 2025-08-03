"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function OrderSummary({
	price,
	isDisabled,
	hideCheckoutButton,
}: {
	price: number;
	isDisabled: boolean;
	hideCheckoutButton?: boolean;
}) {
	const router = useRouter();

	const handleCheckout = () => {
		router.push("/checkout");
	};

	return (
		<div className="w-96">
			<div className="bg-green-50 rounded-lg p-6 space-y-6">
				<h2 className="text-xl font-bold text-gray-800 text-center">
					Order Summary
				</h2>

				<div className="space-y-3">
					<div className="flex justify-between">
						<span className="text-gray-600">Subtotal</span>
						<span className="font-medium">${price.toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Shipping</span>
						<span className="font-medium text-green-600">Free</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Tax</span>
						<span className="font-medium">${0}</span>
					</div>
				</div>

				<div className="border-t border-gray-300 pt-4">
					<div className="flex justify-between items-center text-lg">
						<span className="font-bold text-gray-800">Total</span>
						<span className="font-bold text-green-600">
							${price.toFixed(2)}
						</span>
					</div>
				</div>

				{!hideCheckoutButton && (
					<Button
						className={`w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg font-medium cursor-pointer ${
							isDisabled ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={isDisabled}
						onClick={handleCheckout}
					>
						<Lock className="w-5 h-5 mr-2" />
						Checkout
					</Button>
				)}
			</div>
		</div>
	);
}

export default OrderSummary;
