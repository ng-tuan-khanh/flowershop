"use client";

import React, { use } from "react";
import Layout from "@/components/Layout";
import ProductDetailsCard from "@/components/details/ProductDetailsCard";
import ProductInformation from "@/components/details/ProductInformation";
import useQuery from "@/hooks/useQuery";
import ProductReviews from "@/components/details/ProductReviews";

export default function ProductDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

	const {
		data: product,
		isLoading,
		error,
	} = useQuery(`/products/products/${id}/`);

	// TODO: Add loading and error component
	if (isLoading || error)
		return (
			<Layout>
				<div className="max-w-7xl mx-auto py-8 px-16"></div>
			</Layout>
		);

	return (
		<Layout>
			<div className="max-w-7xl mx-auto py-8 px-16">
				<ProductDetailsCard product={product} />
				<ProductInformation product={product} />
				<ProductReviews product={product} />
			</div>
		</Layout>
	);
}
