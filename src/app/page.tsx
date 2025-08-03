"use client";

import React from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import FreshProductsSection from "@/components/home/FreshProductsSection";
import FeaturedCategoriesSection from "@/components/home/FeaturedCategoriesSection";
import DeliverySection from "@/components/home/DeliverySection";
import useQuery from "@/hooks/useQuery";

function HomePage() {
	const {
		data: featured,
		isLoading: isLoadingFeatured,
		error: errorFeatured,
	} = useQuery("/products/featured/");
	const {
		data: fresh,
		isLoading: isLoadingFresh,
		error: errorFresh,
	} = useQuery("/products/fresh/");

	if (isLoadingFeatured || isLoadingFresh || errorFeatured || errorFresh) {
		return <div></div>;
	}

	return (
		<Layout>
			<div className="flex flex-col gap-16 pb-16">
				<HeroSection />
				<FreshProductsSection fresh={fresh} />
				<FeaturedProductsSection featured={featured} />
				<DeliverySection />
				<FeaturedCategoriesSection />
			</div>
		</Layout>
	);
}

export default HomePage;
