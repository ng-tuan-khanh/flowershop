export interface BaseProduct {
	id: string;
	name: string;
	price: number;
	image?: string;
	emoji?: string;
}

export interface Product extends BaseProduct {
	originalPrice?: number;
	discount?: string;
	rating?: number;
	reviews?: number;
	brand?: string;
	type?: string;
	title?: string;
	isLiked?: boolean;
}

export interface FlashSaleProduct extends BaseProduct {
	originalPrice: number;
	emoji: string;
	type?: string;
}

export interface TrendingProduct {
	title: string;
	subtitle: string;
	price: string;
	emoji: string;
	newTag: boolean;
}

export interface PopularProduct extends BaseProduct {
	originalPrice: number;
	emoji: string;
	rating: number;
	reviews: number;
	type?: string;
}

export interface RelatedProduct extends BaseProduct {
	originalPrice: number;
	emoji: string;
	type?: string;
}
