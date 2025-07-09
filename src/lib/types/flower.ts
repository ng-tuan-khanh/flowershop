export interface BouquetSize {
	name: string;
	stems: string;
	basePrice: number;
}

export interface FlowerType {
	name: string;
	color: string;
	available: boolean;
	seasonalUpcharge: number;
}

export interface DeliveryZone {
	name: string;
	value: string;
	fee: number;
	cutoffTime: string;
}
