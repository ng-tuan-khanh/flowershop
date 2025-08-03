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
	image_url: string;
	stock: number;
}
