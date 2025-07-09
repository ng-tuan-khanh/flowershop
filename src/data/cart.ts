import { CartItem, RecommendedProduct } from "@/lib/types";

export const cartItems: CartItem[] = [
	{
		id: "1",
		name: "Premium Rose Bouquet - Medium",
		price: 65.99,
		quantity: 1,
		color: "Red",
		colorHex: "#dc2626",
		image: "/placeholder-product-1.jpg",
	},
	{
		id: "2",
		name: "Spring Tulip Arrangement - Large",
		price: 45.99,
		quantity: 1,
		color: "Mixed",
		colorHex: "#8b5cf6",
		image: "/placeholder-product-2.jpg",
	},
	{
		id: "3",
		name: "Orchid Plant - Premium",
		price: 85.99,
		quantity: 1,
		color: "Purple",
		colorHex: "#7c3aed",
		image: "/placeholder-product-3.jpg",
	},
];

export const recommendedProducts: RecommendedProduct[] = [
	{
		id: "1",
		name: "Sunflower Bouquet",
		price: 39.99,
		originalPrice: 49.99,
		discount: 20,
		image: "/placeholder-rec-1.jpg",
	},
	{
		id: "2",
		name: "Mixed Wildflowers",
		price: 32.99,
		image: "/placeholder-rec-2.jpg",
	},
	{
		id: "3",
		name: "Peony Arrangement",
		price: 75.99,
		image: "/placeholder-rec-3.jpg",
	},
	{
		id: "4",
		name: "Lily Bouquet",
		price: 52.99,
		image: "/placeholder-rec-4.jpg",
	},
];
