export interface ProductType {
	id: number;
	name: string;
}

export interface Occasion {
	id: number;
	name: string;
}

export interface Condition {
	id: number;
	name: string;
}

export interface PricingRule {
	id: number;
	time_discount: number;
	start_time: string;
	end_time: string;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	type: ProductType;
	occasion: Occasion;
	condition: string;
	average_rating: number;
	total_reviews: number;
	price: number;
	condition_discount: number;
	pricing_rule: PricingRule | null;
	image_url: string;
	stock: number;
}
