import { FlashSaleProduct, TrendingProduct, PopularProduct } from "@/lib/types";

export const flashSaleProducts: FlashSaleProduct[] = [
	{
		id: "1",
		name: "Rose Bouquet",
		price: 45.99,
		originalPrice: 65.99,
		emoji: "🌹",
		type: "Mixed Roses - Premium",
	},
	{
		id: "2",
		name: "Tulip Arrangement",
		price: 32.99,
		originalPrice: 42.99,
		emoji: "🌷",
		type: "Spring Tulips - Colorful",
	},
	{
		id: "3",
		name: "Sunflower Bundle",
		price: 28.99,
		originalPrice: 38.99,
		emoji: "🌻",
		type: "Bright Sunflowers - Large",
	},
	{
		id: "4",
		name: "Lily Collection",
		price: 52.99,
		originalPrice: 72.99,
		emoji: "🪷",
		type: "White Lilies - Elegant",
	},
];

export const trendingProducts: TrendingProduct[] = [
	{
		title: "Wedding Elegance",
		subtitle: "Bridal bouquets & centerpieces",
		price: "From $125",
		emoji: "🤍",
		newTag: true,
	},
	{
		title: "Tropical Paradise",
		subtitle: "Exotic flowers & arrangements",
		price: "From $85",
		emoji: "🌺",
		newTag: false,
	},
	{
		title: "Garden Fresh",
		subtitle: "Seasonal local flowers",
		price: "From $45",
		emoji: "🌼",
		newTag: false,
	},
];

export const popularProducts: PopularProduct[] = [
	{
		id: "1",
		name: "Premium Roses",
		price: 85,
		originalPrice: 95,
		emoji: "🌹",
		rating: 5,
		reviews: 342,
		type: "Red Roses - Dozen",
	},
	{
		id: "2",
		name: "Orchid Plant",
		price: 65,
		originalPrice: 75,
		emoji: "🪻",
		rating: 5,
		reviews: 189,
		type: "Purple Orchid - Potted",
	},
	{
		id: "3",
		name: "Peony Bouquet",
		price: 95,
		originalPrice: 115,
		emoji: "🌸",
		rating: 4,
		reviews: 267,
		type: "Pink Peonies - Seasonal",
	},
	{
		id: "4",
		name: "Hydrangea Arrangement",
		price: 72,
		originalPrice: 85,
		emoji: "💙",
		rating: 5,
		reviews: 156,
		type: "Blue Hydrangeas - Large",
	},
];
