"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { SelectedFilters } from "@/lib/types/filter";
import PageHeader from "@/components/listings/PageHeader";
import FilterSidebar from "@/components/listings/FilterSidebar";
import ProductListings from "@/components/listings/ProductListings";
import { defaultSelectedFilters } from "@/lib/types/filter";
import useProducts from "@/hooks/useProducts";
import ProductListingsSkeleton from "@/components/listings/ProductListingsSkeleton";

const ProductListingsPage = () => {
	return (
		<Layout>
			<ProductListingsContent />
		</Layout>
	);
};

const ProductListingsContent = () => {
	const [filters, setFilters] = useState<SelectedFilters>(
		defaultSelectedFilters
	);

	const {
		data: products,
		error: productsError,
		isLoading: productsLoading,
	} = useProducts(filters);

	if (productsLoading || productsError) {
		return (
			<>
				<PageHeader />

				<div className="flex px-16 py-10">
					<FilterSidebar filters={filters} setFilters={setFilters} />
					<ProductListingsSkeleton />
				</div>
			</>
		);
	}
	return (
		<>
			<PageHeader numProducts={products.length} />

			<div className="flex px-16 py-10">
				<FilterSidebar filters={filters} setFilters={setFilters} />
				<ProductListings products={products} />
			</div>
		</>
	);
};

export default ProductListingsPage;
