"use client";

import React from "react";
import Layout from "../../../components/Layout";
import OrderSummary from "@/components/cart/OrderSummary";
import CartSection from "@/components/cart/CartSection";
import useQuery from "@/hooks/useQuery";
import CartItemCard from "@/components/cart/CartItemCard";
import { CartItem } from "@/lib/types/cart";

export default function CartPage() {
	const { data: cartItems, isLoading, error } = useQuery("/cart-items/");

	const CartItemsContent = () => {
		return (
			<>
				{cartItems.map((item: CartItem) => (
					<CartItemCard key={item.id} item={item} />
				))}
			</>
		);
	};

	const getPrice = () => {
		return cartItems.reduce((acc: number, item: CartItem) => {
			let isDiscountActive = false;
			if (item.product.pricing_rule) {
				const startTime = new Date(item.product.pricing_rule.start_time);
				const endTime = new Date(item.product.pricing_rule.end_time);
				const now = new Date();

				if (now >= startTime && now <= endTime) {
					isDiscountActive = true;
				}
			}

			const discount =
				isDiscountActive && item.product.pricing_rule
					? Number(item.product.pricing_rule.time_discount) +
					  Number(item.product.condition_discount)
					: Number(item.product.condition_discount);
			return (
				acc +
				(item.product.price - (item.product.price * discount) / 100) *
					item.quantity
			);
		}, 0);
	};

	// TODO: Implement loading and error components
	if (isLoading || error) return <div></div>;

	return (
		<Layout>
			<div className="max-w-7xl mx-auto py-16 flex gap-16">
				<CartSection numCartItems={cartItems.length}>
					<CartItemsContent />
				</CartSection>
				<OrderSummary price={getPrice()} isDisabled={cartItems.length === 0} />
			</div>
		</Layout>
	);
}
