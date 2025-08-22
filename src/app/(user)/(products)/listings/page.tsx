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
import Paging from "@/components/listings/Paging";
import SortDropdown from "@/components/listings/SortDropdown";
import { sortOptions } from "@/components/listings/SortDropdown";
import { Product } from "@/lib/types/product";

const PAGE_SIZE = 10;

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
	const [page, setPage] = useState<number>(1);
	const [sortOption, setSortOption] = useState<string>(sortOptions[0].value);

	const {
		data,
		error: productsError,
		isLoading: productsLoading,
	} = useProducts(filters, page, sortOption);

	if (productsLoading || productsError) {
		return (
			<>
				<PageHeader>
					{
						<SortDropdown
							value={sortOption}
							onChange={(option) => setSortOption(option)}
						/>
					}
				</PageHeader>

				<div className="flex px-16 py-10">
					<FilterSidebar filters={filters} setFilters={setFilters} />
					<div className="flex-1">
						<Paging page={page} setPage={setPage} numPages={0} />
						<ProductListingsSkeleton />
					</div>
				</div>
			</>
		);
	}
	const { count, results } = data;
	const productNames = results.map((product: Product) => product.name);
	const numPages = Math.ceil(count / PAGE_SIZE);

	return (
		<>
			<PageHeader numProducts={count}>
				{
					<SortDropdown
						value={sortOption}
						onChange={(option) => setSortOption(option)}
					/>
				}
			</PageHeader>

			<div className="flex px-16 py-10">
				<FilterSidebar
					productNames={productNames}
					filters={filters}
					setFilters={setFilters}
				/>
				<div className="flex-1">
					<Paging page={page} setPage={setPage} numPages={numPages} />
					<ProductListings products={results} />
				</div>
			</div>
		</>
	);
};

export default ProductListingsPage;
