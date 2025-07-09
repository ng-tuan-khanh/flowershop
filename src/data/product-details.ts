import {
	BouquetSize,
	FlowerType,
	DeliveryZone,
	RelatedProduct,
} from "@/lib/types";

export const bouquetSizes: BouquetSize[] = [
	{ name: "Small", stems: "6-9", basePrice: 45.99 },
	{ name: "Medium", stems: "12-15", basePrice: 65.99 },
	{ name: "Large", stems: "18-24", basePrice: 85.99 },
	{ name: "Premium", stems: "24-30", basePrice: 125.99 },
	{ name: "Deluxe", stems: "36+", basePrice: 165.99 },
];

export const flowerTypes: FlowerType[] = [
	{ name: "Red Roses", color: "#dc2626", available: true, seasonalUpcharge: 0 },
	{
		name: "Pink Roses",
		color: "#ec4899",
		available: true,
		seasonalUpcharge: 0,
	},
	{
		name: "White Roses",
		color: "#f3f4f6",
		available: true,
		seasonalUpcharge: 0,
	},
	{
		name: "Mixed Colors",
		color: "#8b5cf6",
		available: false,
		seasonalUpcharge: 5,
	},
];

export const deliveryZones: DeliveryZone[] = [
	{ name: "Local (Same Day)", value: "local", fee: 0, cutoffTime: "14:00" },
	{ name: "Extended Area", value: "extended", fee: 15, cutoffTime: "12:00" },
	{ name: "Express Delivery", value: "express", fee: 25, cutoffTime: "16:00" },
];

export const relatedProducts: RelatedProduct[] = [
	{
		id: "1",
		name: "Tulip Arrangement",
		price: 45.99,
		originalPrice: 55.99,
		emoji: "🌷",
		type: "Spring Collection",
	},
	{
		id: "2",
		name: "Sunflower Bouquet",
		price: 39.99,
		originalPrice: 49.99,
		emoji: "🌻",
		type: "Bright & Cheerful",
	},
	{
		id: "3",
		name: "Mixed Wildflowers",
		price: 35.99,
		originalPrice: 42.99,
		emoji: "🌼",
		type: "Garden Fresh",
	},
	{
		id: "4",
		name: "Orchid Plant",
		price: 75.99,
		originalPrice: 89.99,
		emoji: "🪻",
		type: "Premium Potted",
	},
];
